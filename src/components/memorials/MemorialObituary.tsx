interface MemorialObituaryProps {
  text: string;
  accent: string;
}

export default function MemorialObituary({ text, accent }: MemorialObituaryProps) {
  const accentClasses: Record<string, string> = {
    teal: 'border-teal-200',
    amber: 'border-amber-200',
    rose: 'border-rose-200',
  };

  // Convert line breaks to paragraphs
  const paragraphs = text.split('\n\n').filter((p) => p.trim());

  return (
    <section className="py-12 md:py-16 bg-memorial-bg">
      <div className="max-w-3xl mx-auto px-4">
        <div className={`border-l-4 ${accentClasses[accent] || accentClasses.teal} pl-6 md:pl-8`}>
          <div className="prose prose-lg prose-gray max-w-none">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-4 last:mb-0 font-light">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
