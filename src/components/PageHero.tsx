export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, var(--gold) 0, transparent 45%), radial-gradient(circle at 80% 60%, var(--gold) 0, transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-gold-light">{eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-parchment sm:text-5xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-parchment/65">{description}</p>
        )}
      </div>
    </section>
  );
}
