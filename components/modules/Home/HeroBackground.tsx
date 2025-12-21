export default function HeroBackground() {
  return (
    <>
      {/* Soft Grid */}
      <div className="absolute inset-0 bg-hero-grid" />

      {/* Radial Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[900px] h-[900px] rounded-full bg-emerald-400/15 dark:bg-emerald-500/10 blur-[180px]" />
      </div>

      {/* Gradient Wash */}
      <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background to-background" />
    </>
  );
}
