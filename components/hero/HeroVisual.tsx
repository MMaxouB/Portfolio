export function HeroVisual() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Subtle radial gradient to create depth */}
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      
      {/* Faint grid pattern representing architecture/systems */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
    </div>
  );
}
