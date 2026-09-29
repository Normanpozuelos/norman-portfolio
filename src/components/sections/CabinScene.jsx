import path2Image from "../../assets/path2.png";
import { SceneFrame } from "./SceneFrame";
import { NotebookInteraction } from "./NotebookInteraction";

export const CabinScene = ({ arrived }) => {
  return (
    <SceneFrame
      /* Approved framing: desk (laptop, notebook and pen, lavender photo) with the open door, sunset and fireplace */
      focalClassName="[--fx:0.5] [--fy:0.6] portrait:[--fx:0.55] portrait:[--fy:0.5]"
      /* Stationary camera inside the cabin: no transform. It fades in at the darkest point of
         the handoff (--handoff and --dip-filter are defined in Home) and then holds still. */
      style={{
        opacity: "clamp(0, (var(--handoff, 0) - 0.3) / 0.4, 1)",
        filter: "var(--dip-filter, none)",
      }}
      overlays={
        <>
          {/* Keeps the fixed navbar legible over the bright window */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent" aria-hidden="true" />
          {/* Blends into the black About section below */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/40 to-transparent md:h-40 md:via-transparent" aria-hidden="true" />
        </>
      }
    >
      <picture>
        <img
          src={path2Image}
          alt="Inside the cabin at sunset: a desk with a laptop, a notebook and pen, and a framed lavender photograph, with an open door to the lake and a fireplace burning"
          width="1729"
          height="910"
          fetchPriority="low"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </picture>

      {/* Image space: path2 (1729×910, ~1.9:1) is center-cropped by object-cover inside the 3:2
          wrapper, so this layer matches the image's real rendered box (1.9 / 1.5 = 126.67% wide).
          Anything inside can be placed in % of the actual image. */}
      <div className="absolute inset-y-0 left-[-13.3333%] w-[126.6667%]">
        <NotebookInteraction active={arrived} />
      </div>
    </SceneFrame>
  );
};
