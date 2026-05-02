interface MemorialHeroProps {
  name: string;
  birthDate: string;
  deathDate: string;
  epitaph: string | null;
  heroPhotoUrl: string | null;
  accent: string;
}

export default function MemorialHero({
  name,
  birthDate,
  deathDate,
  epitaph,
  heroPhotoUrl,
  accent,
}: MemorialHeroProps) {
  const accentClasses: Record<string, string> = {
    teal: 'from-teal-800/90 to-teal-900/95',
    amber: 'from-amber-800/90 to-amber-900/95',
    rose: 'from-rose-800/90 to-rose-900/95',
  };

  return (
    <section className="relative">
      {/* Background image or gradient */}
      {heroPhotoUrl ? (
        <div className="absolute inset-0">
          <img
            src={heroPhotoUrl}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${accentClasses[accent] || accentClasses.teal}`} />
        </div>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-b ${accentClasses[accent] || accentClasses.teal}`} />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 md:py-24 text-center text-white">
        {/* Portrait photo circle */}
        {heroPhotoUrl && (
          <div className="mb-8">
            <div className="w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
              <img
                src={heroPhotoUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Name */}
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-4 tracking-wide">
          {name}
        </h1>

        {/* Dates */}
        <p className="text-xl md:text-2xl font-light text-white/90 mb-6">
          {birthDate} — {deathDate}
        </p>

        {/* Epitaph */}
        {epitaph && (
          <p className="text-lg md:text-xl italic text-white/80 max-w-2xl mx-auto">
            &ldquo;{epitaph}&rdquo;
          </p>
        )}
      </div>

      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-memorial-bg to-transparent" />
    </section>
  );
}
