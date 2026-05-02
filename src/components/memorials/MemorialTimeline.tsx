import type { LifeEvent } from '@/lib/supabase/types';

interface MemorialTimelineProps {
  events: LifeEvent[];
  accent: string;
}

export default function MemorialTimeline({ events, accent }: MemorialTimelineProps) {
  const accentClasses: Record<string, { dot: string; line: string }> = {
    teal: { dot: 'bg-teal-500', line: 'border-teal-200' },
    amber: { dot: 'bg-amber-500', line: 'border-amber-200' },
    rose: { dot: 'bg-rose-500', line: 'border-rose-200' },
  };

  const colors = accentClasses[accent] || accentClasses.teal;

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section className="py-12 md:py-16 bg-memorial-bg-alt">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="font-serif text-3xl text-gray-800 mb-8 text-center">
          Life Story
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-px border-l-2 ${colors.line} md:-translate-x-px`} />

          {/* Events */}
          <div className="space-y-8">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`relative flex items-start gap-4 md:gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-1.5">
                  <div className={`w-3 h-3 rounded-full ${colors.dot} ring-4 ring-memorial-bg-alt`} />
                </div>

                {/* Content */}
                <div className={`flex-1 ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                }`}>
                  {event.event_date && (
                    <span className="text-sm text-gray-500 block mb-1">
                      {formatDate(event.event_date)}
                    </span>
                  )}
                  <h3 className="font-medium text-gray-800 mb-1">{event.title}</h3>
                  {event.description && (
                    <p className="text-gray-600 text-sm">{event.description}</p>
                  )}
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
