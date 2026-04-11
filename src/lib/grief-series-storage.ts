/**
 * Grief Series Subscriber Storage
 *
 * For production, set up Upstash Redis and add these env variables:
 * - KV_REST_API_URL
 * - KV_REST_API_TOKEN
 *
 * For local development/demo, this uses in-memory storage (resets on restart)
 */

export interface GriefSeriesSubscriber {
  email: string;
  firstName?: string;
  signupDate: string;
  lastDaySent: number;
}

// In-memory fallback (for demo/development only)
const inMemoryStorage = new Map<string, GriefSeriesSubscriber>();

// Check if Redis is configured
function isRedisConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

// Redis helper functions using fetch (works without @vercel/kv)
async function redisGet(key: string): Promise<string | null> {
  const response = await fetch(`${process.env.KV_REST_API_URL}/get/${key}`, {
    headers: {
      Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
    },
  });
  const data = await response.json();
  return data.result;
}

async function redisSet(key: string, value: string): Promise<void> {
  await fetch(`${process.env.KV_REST_API_URL}/set/${key}/${encodeURIComponent(value)}`, {
    headers: {
      Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
    },
  });
}

async function redisKeys(pattern: string): Promise<string[]> {
  const response = await fetch(`${process.env.KV_REST_API_URL}/keys/${pattern}`, {
    headers: {
      Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
    },
  });
  const data = await response.json();
  return data.result || [];
}

// Storage functions
export async function addSubscriber(subscriber: GriefSeriesSubscriber): Promise<void> {
  if (isRedisConfigured()) {
    await redisSet(`grief-series:${subscriber.email}`, JSON.stringify(subscriber));
  } else {
    inMemoryStorage.set(subscriber.email, subscriber);
    console.log('[Grief Series] Using in-memory storage (configure Redis for production)');
  }
}

export async function getSubscriber(email: string): Promise<GriefSeriesSubscriber | null> {
  if (isRedisConfigured()) {
    const data = await redisGet(`grief-series:${email}`);
    return data ? JSON.parse(data) : null;
  } else {
    return inMemoryStorage.get(email) || null;
  }
}

export async function updateSubscriber(subscriber: GriefSeriesSubscriber): Promise<void> {
  await addSubscriber(subscriber); // Same operation for both storage types
}

export async function getAllSubscribers(): Promise<GriefSeriesSubscriber[]> {
  if (isRedisConfigured()) {
    const keys = await redisKeys('grief-series:*');
    const subscribers: GriefSeriesSubscriber[] = [];
    for (const key of keys) {
      const data = await redisGet(key);
      if (data) {
        subscribers.push(JSON.parse(data));
      }
    }
    return subscribers;
  } else {
    return Array.from(inMemoryStorage.values());
  }
}

export async function removeSubscriber(email: string): Promise<void> {
  if (isRedisConfigured()) {
    await fetch(`${process.env.KV_REST_API_URL}/del/grief-series:${email}`, {
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
      },
    });
  } else {
    inMemoryStorage.delete(email);
  }
}

export function getStorageType(): 'redis' | 'memory' {
  return isRedisConfigured() ? 'redis' : 'memory';
}
