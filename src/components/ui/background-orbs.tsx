// Server component — matches presentation_en.html background style

export function BackgroundOrbs() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none -z-10"
      style={{ contain: "strict" }}
      aria-hidden="true"
    >
      {/* Warm base gradient — from presentation */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, #FAF9F7 0%, #FFF8F0 50%, #fff 100%)`,
        }}
      />

      {/* Radial gradient orbs — exact from presentation_en.html */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(80% 60% at 70% 20%, rgba(209,77,114,0.08) 0%, transparent 50%),
            radial-gradient(60% 50% at 20% 80%, rgba(232,116,154,0.06) 0%, transparent 50%),
            radial-gradient(50% 40% at 50% 50%, rgba(232,224,255,0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* Grid pattern — 40px from presentation */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(209,77,114,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(209,77,114,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
