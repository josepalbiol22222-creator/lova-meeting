// Server component - no "use client" needed (pure static presentation)

export function BackgroundOrbs() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none -z-10"
      style={{ contain: "strict" }}
      aria-hidden="true"
    >
      {/* Base warm gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdf6f0] via-lova-bg to-[#f5f0fa]" />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft grid */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `linear-gradient(rgba(209,77,114,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(209,77,114,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Orbs - GPU composited via will-change in CSS class */}
      <div
        className="absolute rounded-full blur-[120px] animate-float-orb"
        style={{
          width: "500px",
          height: "500px",
          top: "5%",
          right: "10%",
          background:
            "radial-gradient(circle, rgba(209,77,114,0.12) 0%, rgba(209,77,114,0.03) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute rounded-full blur-[100px] animate-float-orb-slow"
        style={{
          width: "400px",
          height: "400px",
          bottom: "10%",
          left: "5%",
          background:
            "radial-gradient(circle, rgba(180,160,255,0.14) 0%, rgba(180,160,255,0.04) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute rounded-full blur-[90px] animate-float-orb"
        style={{
          width: "350px",
          height: "350px",
          top: "40%",
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(circle, rgba(255,200,170,0.12) 0%, transparent 60%)",
          animationDelay: "5s",
        }}
      />
      <div
        className="absolute rounded-full blur-[60px] animate-float-orb-slow"
        style={{
          width: "200px",
          height: "200px",
          top: "15%",
          left: "15%",
          background:
            "radial-gradient(circle, rgba(232,116,154,0.1) 0%, transparent 60%)",
          animationDelay: "10s",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(250,249,247,0.5)_100%)]" />
    </div>
  );
}
