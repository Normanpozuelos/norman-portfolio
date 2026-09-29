import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import path2Image from "../../assets/path2.png";
import { notebookStory } from "../../content/notebook";

// Measured in path2.png (1729×910 px): the leather journal and the notebook/pad under the pen.
const IMAGE = { width: 1729, height: 910 };
const NOTEBOOK = { x: 115, y: 655, width: 772, height: 226 };
// Outline of journal + pad inside that box, in % of the box; keeps the laptop base out of the hit area.
const NOTEBOOK_OUTLINE =
  "polygon(0% 57.5%, 4.5% 27.4%, 24.6% 0%, 60.9% 6.6%, 64.8% 24.3%, 97.2% 36.3%, 100% 44.2%, 76.4% 99.1%)";

const percent = (value) => `${value * 100}%`;

// Leather journal geometry, traced in path2.png px and converted below to % of the hotspot box.
// The journal lies with its spine (the leather face the strap wraps around) facing front-left:
// the spine edge (150,717)→(435,764) is the cover's hinge, and the cover opens at its far edge
// (305,655)→(625,692). The cream face on the right, top edge (435,764)→(617,700), is the pages.
const toBoxX = (x) => percent((x - NOTEBOOK.x) / NOTEBOOK.width);
const toBoxY = (y) => percent((y - NOTEBOOK.y) / NOTEBOOK.height);
const toPolygon = (points) => `polygon(${points.map(([x, y]) => `${toBoxX(x)} ${toBoxY(y)}`).join(", ")})`;
const toOrigin = ([x, y]) => `${toBoxX(x)} ${toBoxY(y)}`;

// Top cover, including its stitched lip down to where the pages start
const COVER_OUTLINE = toPolygon([[150, 717], [305, 655], [625, 692], [628, 696], [617, 700], [435, 764]]);
const COVER_HINGE = toOrigin([150, 717]);

// Paper revealed between the pages and the lifted cover: nothing at the hinge corner, widest at
// the back corner. Sized for the hovered opening (~22px); hidden under the cover while closed.
// Colors sampled from the image (pages in shade ~rgb(118,66,38), lit paper ~rgb(181,113,81)).
const PAPER_GAP_OUTLINE = toPolygon([[435, 764], [618, 701], [628, 697], [628, 673], [618, 678]]);

// Strap and clasp: clasp tab ~387–470 × 688–713, thin tail to ~(520,722), band running down the
// spine to ~y 793. It pivots where it wraps under the book, so the clasp end moves most.
const STRAP_OUTLINE = toPolygon([
  [390, 700], [470, 690], [521, 716], [518, 723], [467, 710], [452, 712], [420, 713],
  [360, 738], [358, 793], [330, 792], [333, 735], [380, 707],
]);
const STRAP_PIVOT = toOrigin([344, 793]);

// Hotspot box, in % of the image-space layer it is placed in
const hotspotBox = {
  left: percent(NOTEBOOK.x / IMAGE.width),
  top: percent(NOTEBOOK.y / IMAGE.height),
  width: percent(NOTEBOOK.width / IMAGE.width),
  height: percent(NOTEBOOK.height / IMAGE.height),
};

// The full image placed inside the hotspot so its pixels line up exactly with the scene below;
// clipped to the notebook outline, this copy is what lifts on hover.
const liftImageBox = {
  left: percent(-NOTEBOOK.x / NOTEBOOK.width),
  top: percent(-NOTEBOOK.y / NOTEBOOK.height),
  width: percent(IMAGE.width / NOTEBOOK.width),
  height: percent(IMAGE.height / NOTEBOOK.height),
};

// Matches the longest close transition below (paper: 500ms)
const CLOSE_MS = 500;

// Discoverability cue: once, this long after the cabin has settled, the clasp releases and the
// cover opens ~18px on its spine (keyframes in index.css). The notebook then stays left slightly
// open, as the lasting hint that there is something to discover.
const CUE_DELAY_MS = 1000;

// Persistent discovery glow along the cream paper's exposed outer edges (not the leather, not
// the pen): paper edge → soft light → fade into the scene. Traced in path2.png px:
//   far back-right edge (800,730)→(872,737), right end of the page edges (876,742–757),
//   front edge along the bottom of the page edges (700,871)→(121,779), left end (121,757–779).
// The two front corners, where the paper is most visible, get a brighter spot.
const PAPER_EDGE = [[800, 730], [872, 737], [876, 745], [876, 757], [700, 871], [121, 779], [121, 757]];
const PAPER_CORNERS = [[700, 860], [121, 768]];

// The glow layer extends past the hotspot box on every side (by 12% of its size, so it keeps the
// box's aspect ratio) so the blur and corner spots are not cut off at the box edge.
const GLOW_BLEED = 0.12;
const glowViewBox = [
  -NOTEBOOK.width * GLOW_BLEED,
  -NOTEBOOK.height * GLOW_BLEED,
  NOTEBOOK.width * (1 + 2 * GLOW_BLEED),
  NOTEBOOK.height * (1 + 2 * GLOW_BLEED),
].join(" ");
const toBoxPx = ([x, y]) => `${x - NOTEBOOK.x},${y - NOTEBOOK.y}`;

// Alpha mask: the edge as a soft stroke, plus radial spots on the front corners
const PAPER_EDGE_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${glowViewBox}" preserveAspectRatio="none">` +
    `<defs><radialGradient id="c"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>` +
    `<polyline points="${PAPER_EDGE.map(toBoxPx).join(" ")}" fill="none" stroke="#fff" stroke-opacity="0.75" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>` +
    PAPER_CORNERS.map((corner) => {
      const [cx, cy] = toBoxPx(corner).split(",");
      return `<circle cx="${cx}" cy="${cy}" r="22" fill="url(#c)"/>`;
    }).join("") +
    `</svg>`
)}")`;

// Warm amber/gold dominates; one softer highlight travels around, shifting through the
// portfolio's own indigo → blue (indigo-400 #818cf8, blue-400 #60a5fa) at lower strength so it
// tints the light rather than replacing it. It starts at the far (back) side, so the visible
// front edges begin warm.
const GLOW_GRADIENT = `conic-gradient(from -40deg,
  rgba(129, 140, 248, 0.7) 0deg,
  rgba(96, 165, 250, 0.6) 25deg,
  rgba(129, 140, 248, 0.65) 50deg,
  rgba(255, 190, 100, 0.95) 95deg,
  rgba(255, 214, 150, 0.95) 180deg,
  rgba(255, 180, 80, 0.95) 260deg,
  rgba(255, 190, 100, 0.95) 315deg,
  rgba(129, 140, 248, 0.7) 360deg)`;

// Paper center, in % of the glow layer; the gradient turns around it
const PAPER_CENTER = [500, 790];
const glowCenter = {
  left: percent((PAPER_CENTER[0] - NOTEBOOK.x + NOTEBOOK.width * GLOW_BLEED) / (NOTEBOOK.width * (1 + 2 * GLOW_BLEED))),
  top: percent((PAPER_CENTER[1] - NOTEBOOK.y + NOTEBOOK.height * GLOW_BLEED) / (NOTEBOOK.height * (1 + 2 * GLOW_BLEED))),
};

// The travelling gradient, visible only through the paper-edge mask. Blurred by its parent.
// One lap per KITT scanner cycle (--kitt-duration in index.css), so the two stay in step.
const PaperEdgeLight = () => (
  <span
    className="absolute -inset-[12%]"
    style={{
      maskImage: PAPER_EDGE_MASK,
      WebkitMaskImage: PAPER_EDGE_MASK,
      maskSize: "100% 100%",
      WebkitMaskSize: "100% 100%",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
    }}
  >
    <span
      className="absolute aspect-square w-[130%] -translate-x-1/2 -translate-y-1/2
                 animate-[notebook-glow-travel_var(--kitt-duration)_linear_infinite] motion-reduce:animate-none"
      style={{ ...glowCenter, backgroundImage: GLOW_GRADIENT }}
    />
  </span>
);

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const NotebookInteraction = ({ active }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);
  const pageRef = useRef(null);
  const closeTimer = useRef(0);
  // "closed" → "opening" (plays once) → "open" (stays). Reduced motion goes straight to "open".
  const [cover, setCover] = useState("closed");

  useEffect(() => {
    if (!active || cover !== "closed") return undefined;
    // Cancelled if the visitor scrolls back out before it plays; it then waits for the next arrival
    const timer = window.setTimeout(() => {
      setCover(prefersReducedMotion() ? "open" : "opening");
    }, CUE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, cover]);

  function openNotebook() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    window.clearTimeout(closeTimer.current);
    dialog.showModal();
    pageRef.current?.focus();
    setIsOpen(true);
    // Next frame, so the closed styles are painted first and the reveal transitions run
    requestAnimationFrame(() => {
      requestAnimationFrame(() => dialog.setAttribute("data-open", ""));
    });
  }

  function closeNotebook() {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open) return;
    dialog.removeAttribute("data-open");
    setIsOpen(false);
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => dialog.close(), prefersReducedMotion() ? 0 : CLOSE_MS);
  }

  // Lock the page scroll while the notebook is open so the cabin stays in place
  useEffect(() => {
    if (!isOpen) return undefined;

    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [isOpen]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <>
      <button
        type="button"
        inert={!active}
        onClick={openNotebook}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Open the notebook"
        className="group/hotspot absolute cursor-pointer border-0 bg-transparent p-0 outline-none"
        style={hotspotBox}
      >
        <span
          className={`absolute inset-0 origin-bottom transition-[transform,filter] duration-300 ease-out motion-reduce:transition-none
                      group-hover/hotspot:-translate-y-[5px] group-hover/hotspot:scale-[1.0225]
                      group-hover/hotspot:[filter:drop-shadow(0_9px_14px_rgba(45,15,0,0.65))_brightness(1.08)]
                      group-focus-visible/hotspot:-translate-y-[5px] group-focus-visible/hotspot:scale-[1.0225]
                      group-focus-visible/hotspot:[filter:drop-shadow(0_0_1px_rgba(255,214,150,0.95))_drop-shadow(0_0_6px_rgba(255,170,80,0.7))_brightness(1.08)]
                      ${isOpen ? "-translate-y-[5px] scale-[1.0225] [filter:drop-shadow(0_9px_14px_rgba(45,15,0,0.65))_brightness(1.08)]" : ""}`}
        >
          <span className="absolute inset-0 overflow-hidden" style={{ clipPath: NOTEBOOK_OUTLINE }}>
            <img src={path2Image} alt="" className="absolute max-w-none" style={liftImageBox} />
          </span>

          {/* Discovery glow on the paper edges, above the notebook so the dark board and shadow
              don't swallow it. On once Path 2 has arrived, stronger on hover/focus, gone while
              the dialog is open. */}
          <span
            className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none
                        ${active && !isOpen
                          ? "opacity-75 group-hover/hotspot:opacity-100 group-focus-visible/hotspot:opacity-100"
                          : "opacity-0"}`}
            aria-hidden="true"
          >
            <span className="absolute inset-0 animate-[notebook-glow-breathe_6s_ease-in-out_infinite] motion-reduce:animate-none">
              {/* Very soft diffusion outward (~12–20px) */}
              <span className="absolute inset-0 opacity-55 blur-[14px]">
                <PaperEdgeLight />
              </span>
              {/* Brighter light right on the paper edge */}
              <span className="absolute inset-0 opacity-95 blur-[2px]">
                <PaperEdgeLight />
              </span>
            </span>
          </span>

          {/* Cue layers. At rest each is an exact copy of the pixels beneath, so nothing shows
              until the cue plays. */}
          {/* Paper between pages and cover, darker toward the hinge, lit toward the open edge */}
          <span
            className="absolute inset-0 bg-[linear-gradient(to_right,rgb(92,48,26)_42%,rgb(140,84,54)_56%,rgb(178,112,78)_66%)]"
            style={{ clipPath: PAPER_GAP_OUTLINE }}
            aria-hidden="true"
          />
          {/* Top cover, hinged on the spine: its far edge rises (a vertical shear away from the
              hinge line), casting a soft shadow onto the paper below. The "open" transform must
              match the last notebook-cover-open keyframe: 18px open, 22px when hovered/focused. */}
          <span
            className={`absolute inset-0
                        ${cover === "opening" ? "animate-[notebook-cover-open_2s_both]" : ""}
                        ${cover === "open"
                          ? `[transform:matrix(1,-0.02929,0,1.17761,0,0)] [filter:drop-shadow(0_3px_5px_rgba(30,10,0,0.55))]
                             transition-transform duration-300 ease-out motion-reduce:transition-none
                             group-hover/hotspot:[transform:matrix(1,-0.03579,0,1.21707,0,0)]
                             group-focus-visible/hotspot:[transform:matrix(1,-0.03579,0,1.21707,0,0)]`
                          : ""}`}
            style={{ transformOrigin: COVER_HINGE }}
            onAnimationEnd={(event) => {
              if (event.animationName === "notebook-cover-open") setCover("open");
            }}
          >
            <span className="absolute inset-0 overflow-hidden" style={{ clipPath: COVER_OUTLINE }}>
              <img src={path2Image} alt="" className="absolute max-w-none" style={liftImageBox} />
            </span>
          </span>
          {/* Strap and clasp: releases first (swings off the cover from where it wraps under the
              book), then rides up with the opening cover and stays loose. The "open" state must
              match the last notebook-strap-release keyframe. */}
          <span
            className={`absolute inset-0
                        ${cover === "opening" ? "animate-[notebook-strap-release_2s_both]" : ""}
                        ${cover === "open"
                          ? "[transform:translateY(-8px)_rotate(-3deg)] [filter:drop-shadow(0_4px_4px_rgba(15,5,0,0.6))]"
                          : ""}`}
            style={{ transformOrigin: STRAP_PIVOT }}
          >
            <span className="absolute inset-0 overflow-hidden" style={{ clipPath: STRAP_OUTLINE }}>
              <img src={path2Image} alt="" className="absolute max-w-none" style={liftImageBox} />
            </span>
          </span>
        </span>
      </button>

      {createPortal(
        <dialog
          ref={dialogRef}
          aria-labelledby="notebook-title"
          onCancel={(event) => {
            event.preventDefault();
            closeNotebook();
          }}
          onClick={(event) => {
            // Clicks outside the page land on the dialog element itself (its backdrop)
            if (event.target === event.currentTarget) closeNotebook();
          }}
          className="group/notebook m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 text-[#3a2a1c]
                     backdrop:bg-[radial-gradient(ellipse_at_30%_85%,rgba(60,26,6,0.35),rgba(12,6,2,0.72))]
                     backdrop:opacity-0 backdrop:transition-opacity backdrop:duration-500 motion-reduce:backdrop:transition-none
                     data-[open]:backdrop:opacity-100"
        >
          {/* A sheet of the notebook's paper, unrolling upward from the notebook side (bottom left) */}
          <article
            ref={pageRef}
            tabIndex={-1}
            className="relative max-h-[min(80svh,46rem)] w-[min(34rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain rounded-[2px]
                       px-7 pt-6 pb-8 outline-none sm:px-10 sm:pt-8 sm:pb-10
                       bg-[#f3e8cf] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85),0_12px_24px_-12px_rgba(40,15,0,0.6)]
                       [background-image:radial-gradient(ellipse_at_50%_40%,transparent_55%,rgba(120,80,30,0.18)),linear-gradient(to_right,transparent_2.5rem,rgba(176,64,52,0.22)_2.5rem,rgba(176,64,52,0.22)_calc(2.5rem+1px),transparent_calc(2.5rem+1px)),repeating-linear-gradient(to_bottom,transparent_0,transparent_calc(2rem-1px),rgba(110,85,60,0.16)_calc(2rem-1px),rgba(110,85,60,0.16)_2rem)]
                       origin-bottom-left opacity-0 [clip-path:inset(100%_0_0_0)] translate-y-8 -rotate-3
                       transition-[clip-path,transform,opacity] duration-500 ease-out motion-reduce:transition-none
                       group-data-[open]/notebook:opacity-100 group-data-[open]/notebook:[clip-path:inset(0)]
                       group-data-[open]/notebook:translate-y-0 group-data-[open]/notebook:-rotate-[0.8deg]
                       group-data-[open]/notebook:duration-700"
            style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif' }}
          >
            <button
              type="button"
              onClick={closeNotebook}
              aria-label="Close the notebook"
              className="absolute top-4 right-5 cursor-pointer rounded-sm px-1 text-sm italic text-[#6b4e33] underline decoration-[#6b4e33]/30
                         underline-offset-4 transition-colors hover:text-[#3a2a1c] hover:decoration-[#3a2a1c]
                         focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6b4e33]"
            >
              close ×
            </button>

            {[
              <p key="eyebrow" className="text-sm italic leading-8 text-[#7a5a3c]">{notebookStory.eyebrow}</p>,
              <h2 key="title" id="notebook-title" className="mb-8 text-2xl font-semibold leading-8">{notebookStory.title}</h2>,
              ...notebookStory.paragraphs.map((paragraph, index) => (
                <p key={`paragraph-${index}`} className="mb-8 text-[1.05rem] leading-8">{paragraph}</p>
              )),
              <p key="signature" className="text-right italic leading-8">{notebookStory.signature}</p>,
            ].map((line, index) => (
              // Lines settle in one after another once the page has opened
              <div
                key={line.key}
                className="translate-y-2 opacity-0 transition duration-500 ease-out motion-reduce:transition-none
                           group-data-[open]/notebook:translate-y-0 group-data-[open]/notebook:opacity-100
                           group-data-[open]/notebook:[transition-delay:var(--line-delay)]"
                style={{ "--line-delay": `${300 + index * 90}ms` }}
              >
                {line}
              </div>
            ))}
          </article>
        </dialog>,
        document.body
      )}
    </>
  );
};
