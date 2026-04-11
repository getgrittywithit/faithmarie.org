import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getAllDigests, getDigestBySlug, topicLabels } from '@/data/digests';

// Crisis keywords that should trigger immediate intervention
const CRISIS_KEYWORDS = [
  'kill myself',
  'suicide',
  'suicidal',
  'end my life',
  'want to die',
  'better off dead',
  'no reason to live',
  'self harm',
  'self-harm',
  'hurt myself',
  'cutting myself',
  'overdose',
];

// Check if message contains crisis indicators
function detectCrisis(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return CRISIS_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
}

// Simple relevance search through digests
function searchDigests(query: string): string {
  const digests = getAllDigests();
  const lowerQuery = query.toLowerCase();

  // Keywords to match against topics and content
  const topicKeywords: Record<string, string[]> = {
    grief: ['grief', 'loss', 'died', 'death', 'mourning', 'bereaved', 'passed away', 'losing someone'],
    ptsd: ['ptsd', 'trauma', 'traumatic', 'flashback', 'nightmare', 'emdr', 'assault', 'accident', 'abuse'],
    depression: ['depression', 'depressed', 'hopeless', 'sad', 'empty', 'worthless', 'no motivation', 'tired all the time'],
    anxiety: ['anxiety', 'anxious', 'worry', 'panic', 'nervous', 'scared', 'fear', 'overwhelmed'],
  };

  // Find relevant digests
  const relevantDigests = digests.filter(digest => {
    // Check topic keywords
    const topicMatches = topicKeywords[digest.topic]?.some(kw => lowerQuery.includes(kw));

    // Check title and summary
    const titleMatch = digest.title.toLowerCase().split(' ').some(word =>
      lowerQuery.includes(word) && word.length > 3
    );
    const summaryMatch = digest.summary.toLowerCase().split(' ').some(word =>
      lowerQuery.includes(word) && word.length > 4
    );

    return topicMatches || titleMatch || summaryMatch;
  });

  if (relevantDigests.length === 0) {
    return '';
  }

  // Format relevant digests for context
  return relevantDigests.slice(0, 2).map(d => `
--- Research Digest: "${d.title}" (${topicLabels[d.topic]}) ---
Summary: ${d.summary}

Key Findings:
${d.keyFindings.map((f, i) => `${i + 1}. ${f}`).join('\n')}

What This Means: ${d.whatThisMeans.slice(0, 500)}...

Read more: /research/daily-digests/${d.slug}
---
`).join('\n\n');
}

const SYSTEM_PROMPT = `You are a compassionate research assistant for the Faith Marie Foundation, a nonprofit that makes mental health research accessible. You help people understand mental health topics by explaining research in plain language.

CRITICAL RULES:
1. You are NOT a therapist, counselor, or medical professional
2. You can ONLY discuss research that has been published by the Faith Marie Foundation (provided in context)
3. If asked about something outside the provided research, say "I don't have research on that specific topic yet, but I'd encourage you to explore our published digests or consult a mental health professional."
4. ALWAYS recommend professional help for personal mental health concerns
5. NEVER provide diagnoses, treatment recommendations, or medical advice
6. Be warm and compassionate, but maintain appropriate boundaries
7. If someone seems to be in crisis, immediately direct them to crisis resources (988 Suicide & Crisis Lifeline)

When responding:
- Reference the specific research digest when applicable
- Use phrases like "Research suggests..." or "According to our digest on..."
- Keep responses concise but helpful (2-3 paragraphs max)
- End with either a link to relevant content OR encouragement to seek professional support
- Include the disclaimer when discussing anything that could be construed as advice

Your tone should be: warm, knowledgeable, humble about limitations, and genuinely caring.`;

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check for crisis keywords FIRST
    if (detectCrisis(message)) {
      return NextResponse.json({
        response: null,
        crisis: true,
        crisisMessage: `I'm concerned about what you've shared. Your safety matters, and I want to make sure you get the support you need right now.

**Please reach out to one of these resources immediately:**

📞 **988 Suicide & Crisis Lifeline** — Call or text 988
💬 **Crisis Text Line** — Text HOME to 741741
🌐 **International Association for Suicide Prevention** — https://www.iasp.info/resources/Crisis_Centres/

These services are free, confidential, and available 24/7. You don't have to face this alone.

I'm an AI and not equipped to provide crisis support, but trained counselors at these services can help you right now.`,
      });
    }

    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({
        response: `I'm currently in demo mode. To enable full functionality, the site administrator needs to configure the AI service.

In the meantime, you can explore our published research digests:
- [The Dual Process Model: Why Grief Comes in Waves](/research/daily-digests/dual-process-model-grief-2024)
- [How EMDR Actually Works](/research/daily-digests/emdr-trauma-processing-mechanisms)
- [Exercise as Antidepressant: How Much Is Enough?](/research/daily-digests/exercise-depression-dose-response)

Or browse all our [Research Digests](/research/daily-digests).`,
        crisis: false,
        demoMode: true,
      });
    }

    // Search for relevant digests
    const relevantContext = searchDigests(message);

    // Build conversation history for Claude
    const messages = [
      ...history.slice(-6).map((h: { role: string; content: string }) => ({
        role: h.role as 'user' | 'assistant',
        content: h.content,
      })),
      {
        role: 'user' as const,
        content: relevantContext
          ? `[CONTEXT FROM FAITH MARIE FOUNDATION RESEARCH]\n${relevantContext}\n\n[USER MESSAGE]\n${message}`
          : `[No directly relevant research found in our database]\n\n[USER MESSAGE]\n${message}`,
      },
    ];

    // Call Claude API
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    // Extract text response
    const textContent = response.content.find(c => c.type === 'text');
    const assistantMessage = textContent ? textContent.text : 'I apologize, but I was unable to generate a response. Please try again.';

    return NextResponse.json({
      response: assistantMessage,
      crisis: false,
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'An error occurred processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
