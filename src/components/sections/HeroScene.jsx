import path1Image from "../../assets/path1.png";
import { SceneFrame } from "./SceneFrame";

export const HeroScene = () => {
  return (
    <SceneFrame
      /* object-position 60% 45%, portrait 88% 50% */
      focalClassName="[--fx:0.6] [--fy:0.45] portrait:[--fx:0.88] portrait:[--fy:0.5]"
      /* push: camera moves toward the cabin (~81% 38%) up to 1.35x; arrive: keeps drifting in
         while the cabin interior fades in over it */
      transform="scale(calc(1 + var(--push, 0) * 0.35 + var(--arrive, 0) * 0.15))"
      transformOrigin="81% 38%"
      /* Warm dim toward the cut into the cabin (defined in Home) */
      style={{ filter: "var(--dip-filter, none)" }}
      overlays={
        <>
          {/* Readability: darken the top-left sky where the hero text sits */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_0%_0%,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.3)_40%,transparent_70%)]"
            aria-hidden="true"
          />
          {/* Keeps the fixed navbar legible over bright sky */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" aria-hidden="true" />
          {/* Blends into the black About section below */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/40 to-transparent md:h-40 md:via-transparent" aria-hidden="true" />
        </>
      }
    >
      <picture>
        <img
          src={path1Image}
          alt="A turf-roofed wooden cabin above a lakeside dock at sunset, with volcanoes across the water"
          width="1536"
          height="1024"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[60%_45%] portrait:object-[88%_50%]"
        />
      </picture>

      {/* Warm spill from the lantern on the left porch post (~3.1% 39% of the source image) */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen bg-[radial-gradient(ellipse_13%_19%_at_3.1%_39%,rgba(255,170,85,0.3)_0%,rgba(255,140,60,0.14)_35%,rgba(255,120,40,0.05)_65%,transparent_100%)]"
        aria-hidden="true"
      />
    </SceneFrame>
  );
};
