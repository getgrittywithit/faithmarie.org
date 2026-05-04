interface MemorialObituaryProps {
  text: string;
  accent: string;
}

export default function MemorialObituary({ text }: MemorialObituaryProps) {
  // Convert line breaks to paragraphs
  const paragraphs = text.split('\n\n').filter((p) => p.trim());

  return (
    <section className="py-12 md:py-16 bg-warm-cream">
      <div className="max-w-3xl mx-auto px-4">
        <div className="border-l-4 border-champagne-gold pl-6 md:pl-8">
          <div className="prose prose-lg max-w-none">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-stone-700 leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
