// Server component — pure static decoration

export function BackgroundOrbs() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none -z-10"
      style={{ contain: "strict" }}
      aria-hidden="true"
    >
      {/* Factorial neutral base */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-2 via-[#F7F7F8] to-[#F0F4F5]" />

      {/* Subtle noise */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Frobel geometric grid (Factorial brand element) */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(26,26,49,0.4) 1px, transparent 0)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radical red orb — top right */}
      <div
        className="absolute rounded-full blur-[120px] animate-float-orb"
        style={{
          width: "450px",
          height: "450px",
          top: "5%",
          right: "8%",
          background: "radial-gradient(circle, rgba(255,53,94,0.08) 0%, rgba(255,53,94,0.02) 45%, transparent 70%)",
        }}
      />

      {/* Viridian orb — bottom left */}
      <div
        className="absolute rounded-full blur-[100px] animate-float-orb-slow"
        style={{
          width: "400px",
          height: "400px",
          bottom: "10%",
          left: "5%",
          background: "radial-gradient(circle, rgba(7,162,173,0.07) 0%, rgba(7,162,173,0.02) 45%, transparent 70%)",
        }}
      />

      {/* Gold/warm orb — center (Factorial One) */}
      <div
        className="absolute rounded-full blur-[90px] animate-float-orb"
        style={{
          width: "300px",
          height: "300px",
          top: "45%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(249,214,155,0.08) 0%, transparent 60%)",
          animationDelay: "5s",
        }}
      />

      {/* Lavender orb — subtle */}
      <div
        className="absolute rounded-full blur-[60px] animate-float-orb-slow"
        style={{
          width: "180px",
          height: "180px",
          top: "15%",
          left: "20%",
          background: "radial-gradient(circle, rgba(210,217,249,0.1) 0%, transparent 60%)",
          animationDelay: "10s",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(244,244,245,0.6)_100%)]" />
    </div>
  );
}
