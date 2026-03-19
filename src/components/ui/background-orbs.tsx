export function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-lova-cream via-lova-bg to-white" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(209,77,114,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(209,77,114,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute rounded-full blur-[100px] animate-float-orb"
        style={{
          width: "400px",
          height: "400px",
          top: "10%",
          left: "60%",
          background:
            "radial-gradient(circle, rgba(209,77,114,0.15) 0%, rgba(209,77,114,0.05) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute rounded-full blur-[80px] animate-float-orb-slow"
        style={{
          width: "300px",
          height: "300px",
          top: "50%",
          left: "20%",
          background:
            "radial-gradient(circle, rgba(232,116,154,0.12) 0%, rgba(232,116,154,0.04) 40%, transparent 70%)",
        }}
      />
      <div
        className="absolute rounded-full blur-[70px] animate-float-orb"
        style={{
          width: "250px",
          height: "250px",
          top: "70%",
          left: "70%",
          background:
            "radial-gradient(circle, rgba(232,224,255,0.2) 0%, rgba(232,224,255,0.06) 40%, transparent 70%)",
          animationDelay: "4s",
        }}
      />
      <div
        className="absolute rounded-full blur-[60px] animate-float-orb-slow"
        style={{
          width: "200px",
          height: "200px",
          top: "20%",
          left: "10%",
          background:
            "radial-gradient(circle, rgba(255,232,214,0.25) 0%, transparent 60%)",
          animationDelay: "8s",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(transparent_0%,transparent_70%,rgba(250,249,247,0.4)_100%)]" />
    </div>
  );
}
