// Full-bleed scene with a 3:2 wrapper that reproduces object-cover + object-position, so
// children placed in % (overlays, glows, zoom origins) stay locked to the same spot in the
// image at any viewport size. `focalClassName` sets --fx/--fy (the object-position fractions);
// it must be a literal class string so Tailwind can see it, e.g.
// "[--fx:0.6] [--fy:0.45] portrait:[--fx:0.88] portrait:[--fy:0.5]".
export const SceneFrame = ({ focalClassName, transform, transformOrigin, style, children, overlays }) => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black [container-type:size]" style={style}>
      <div
        className={`absolute ${focalClassName}`}
        style={{
          width: "max(100cqw, 150cqh)",
          height: "max(100cqh, 66.6667cqw)",
          left: "calc((100cqw - max(100cqw, 150cqh)) * var(--fx))",
          top: "calc((100cqh - max(100cqh, 66.6667cqw)) * var(--fy))",
          transform,
          transformOrigin,
        }}
      >
        {children}
      </div>
      {overlays}
    </div>
  );
};
