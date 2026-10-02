import { useEffect, useRef, useState } from "react";
import path2Image from "../../assets/path2.png";

// Small hidden details in the cabin (Path 2): the framed lavender photograph and the coffee mug.
// Same technique as the notebook: each hotspot holds a copy of the scene image aligned
// pixel-for-pixel and clipped to the object's traced outline, so at rest nothing changes and
// the object itself is what moves. All coordinates are path2.png px (1729×910).
const IMAGE = { width: 1729, height: 910 };

const percent = (value) => `${value * 100}%`;

const boxStyle = (box) => ({
  left: percent(box.x / IMAGE.width),
  top: percent(box.y / IMAGE.height),
  width: percent(box.width / IMAGE.width),
  height: percent(box.height / IMAGE.height),
});

// The full image placed inside a box so its pixels line up with the scene below
const imageInBoxStyle = (box) => ({
  left: percent(-box.x / box.width),
  top: percent(-box.y / box.height),
  width: percent(IMAGE.width / box.width),
  height: percent(IMAGE.height / box.height),
});

const outlineInBox = (box, points) =>
  `polygon(${points
    .map(([x, y]) => `${percent((x - box.x) / box.width)} ${percent((y - box.y) / box.height)}`)
    .join(", ")})`;

// Framed photograph: outer frame corners (1300,437) (1605,462) (1530,780) (1218,718), stepping
// around the camera lens that overlaps its lower right.
const PHOTO = { x: 1218, y: 437, width: 387, height: 345 };
const PHOTO_OUTLINE = outlineInBox(PHOTO, [
  [1300, 437], [1605, 462], [1570, 615], [1538, 650], [1528, 782], [1218, 718],
]);
// The lavender print inside the frame leans back with it: corners (1300,477) (1550,497)
// (1500,722) (1268,682). The thought is laid onto that plane with an affine fit (origin at the
// top-left corner, x along the top/bottom edges, y along the side edges).
const PRINT = { x: 1300, y: 477, width: 241, height: 215 };
const printPlaneStyle = {
  left: percent((PRINT.x - PHOTO.x) / PHOTO.width),
  top: percent((PRINT.y - PHOTO.y) / PHOTO.height),
  width: percent(PRINT.width / PHOTO.width),
  height: percent(PRINT.height / PHOTO.height),
  transform: "matrix(1, 0.1245, -0.1907, 1, 0, 0)",
  transformOrigin: "0 0",
};

// Coffee mug: body x 957–1100, rim ~y 568, base ~y 724, handle to x 1143
const MUG = { x: 955, y: 565, width: 190, height: 160 };
const MUG_OUTLINE = outlineInBox(MUG, [
  [958, 578], [985, 568], [1065, 568], [1100, 578], [1112, 604], [1136, 610], [1143, 640],
  [1128, 682], [1098, 692], [1095, 705], [1072, 719], [1030, 724], [988, 720], [964, 707], [957, 690],
]);
// Caption sits above the rim, wider than the mug and centered on it
const MUG_CAPTION = { x: 870, y: 474, width: 360, height: 40 };
// Steam rises from the rim
const MUG_STEAM = [1012, 1040, 1066];

// Shared behavior: hover reveals for mouse; tap or keyboard (Enter/Space) toggles, then settles
// back on its own after a while; Escape or leaving focus settles it immediately.
function useDiscovery(active, settleAfterMs) {
  const [revealed, setRevealed] = useState(false);
  const pointerType = useRef("");
  const settleTimer = useRef(0);

  useEffect(() => () => window.clearTimeout(settleTimer.current), []);

  function show(autoSettle) {
    window.clearTimeout(settleTimer.current);
    setRevealed(true);
    if (autoSettle) settleTimer.current = window.setTimeout(() => setRevealed(false), settleAfterMs);
  }

  function hide() {
    window.clearTimeout(settleTimer.current);
    setRevealed(false);
  }

  return {
    // Settles back automatically if the visitor scrolls away from the cabin
    revealed: revealed && active,
    handlers: {
      onPointerEnter: (event) => {
        if (event.pointerType === "mouse") show(false);
      },
      onPointerLeave: (event) => {
        if (event.pointerType === "mouse") hide();
      },
      onPointerDown: (event) => {
        pointerType.current = event.pointerType;
      },
      onClick: () => {
        const type = pointerType.current;
        pointerType.current = "";
        // Mouse is handled by hover; touch and keyboard toggle
        if (type === "mouse") return;
        if (revealed) hide();
        else show(true);
      },
      onKeyDown: (event) => {
        if (event.key === "Escape") hide();
      },
      onBlur: hide,
    },
  };
}

const THOUGHT_LINES = [
  { text: "If AI disappeared tomorrow…" },
  { text: "could I still build this?" },
  { text: "Yes.", gap: true },
  { text: "Keep learning.", gap: true },
  { text: "Curiosity wins today.", gap: true },
];
const THOUGHT = THOUGHT_LINES.map((line) => line.text).join(" ");
const MUG_LINE = "A yawn ☕🥱 is a silent scream for coffee.";

const PhotoDiscovery = ({ active }) => {
  const { revealed, handlers } = useDiscovery(active, 9000);

  return (
    <>
      <button
        type="button"
        inert={!active}
        aria-label="Look closer at the lavender photograph"
        aria-expanded={revealed}
        className="group/photo absolute cursor-pointer border-0 bg-transparent p-0 outline-none"
        style={boxStyle(PHOTO)}
        {...handlers}
      >
        {/* The frame gently rises toward the visitor (a few px of lift, a hint of scale, a
            softer shadow) and settles back; no rotation, so it stays square and natural */}
        <span
          className={`absolute inset-0 transition-[transform,filter] duration-[600ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-reduce:transition-none
                      group-focus-visible/photo:[filter:drop-shadow(0_0_1px_rgba(255,214,150,0.95))_drop-shadow(0_0_6px_rgba(255,170,80,0.6))]
                      ${revealed
                        ? "[transform:translateY(-4px)_scale(1.012)] [filter:drop-shadow(0_10px_14px_rgba(30,10,0,0.55))] motion-reduce:[transform:none]"
                        : ""}`}
        >
          <span className="absolute inset-0 overflow-hidden" style={{ clipPath: PHOTO_OUTLINE }}>
            <img src={path2Image} alt="" className="absolute max-w-none" style={imageInBoxStyle(PHOTO)} />
            {/* Soft warm light catching the frame once as it opens */}
            <span
              className={`absolute inset-0 mix-blend-screen bg-[linear-gradient(105deg,transparent_38%,rgba(255,222,170,0.32)_50%,transparent_62%)] bg-[length:250%_100%] bg-[position:110%_0]
                          ${revealed ? "animate-[photo-edge-light_1.4s_ease-out_both] motion-reduce:animate-none" : "opacity-0"}`}
              aria-hidden="true"
            />
          </span>

          {/* The thought, on the plane of the print: the photo dims a little and the lines
              surface one after another */}
          <span className="absolute [container-type:inline-size]" style={printPlaneStyle} aria-hidden="true">
            <span
              className={`absolute inset-0 bg-[radial-gradient(ellipse_at_45%_50%,rgba(16,8,26,0.62),rgba(16,8,26,0.4)_65%,rgba(16,8,26,0.12))]
                          transition-opacity ease-out motion-reduce:transition-none
                          ${revealed ? "opacity-100 duration-700 delay-300" : "opacity-0 duration-700"}`}
            />
            <span
              className="absolute inset-0 flex flex-col justify-center px-[9%] text-[6cqw] leading-[1.35] italic text-[#fbf3e6]
                         [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]"
              style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif' }}
            >
              {THOUGHT_LINES.map((line, index) => (
                <span
                  key={line.text}
                  className={`block transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none
                              ${line.gap ? "mt-[0.7em]" : ""}
                              ${revealed ? "translate-y-0 opacity-100" : "translate-y-[0.3em] opacity-0 !delay-0"}`}
                  style={{ transitionDelay: `${600 + index * 280}ms` }}
                >
                  {line.text}
                </span>
              ))}
            </span>
          </span>
        </span>
      </button>
      <span className="sr-only" aria-live="polite">{revealed ? THOUGHT : ""}</span>
    </>
  );
};

const MugDiscovery = ({ active }) => {
  const { revealed, handlers } = useDiscovery(active, 5000);

  return (
    <>
      <button
        type="button"
        inert={!active}
        aria-label="Look at the coffee mug"
        aria-expanded={revealed}
        className="group/mug absolute cursor-pointer border-0 bg-transparent p-0 outline-none"
        style={boxStyle(MUG)}
        {...handlers}
      >
        <span
          className={`absolute inset-0 transition-[transform,filter] duration-500 ease-out motion-reduce:transition-none
                      group-focus-visible/mug:[filter:drop-shadow(0_0_1px_rgba(255,214,150,0.95))_drop-shadow(0_0_5px_rgba(255,170,80,0.6))]
                      ${revealed
                        ? "-translate-y-[3px] [filter:drop-shadow(0_6px_8px_rgba(30,10,0,0.5))_brightness(1.07)] motion-reduce:translate-y-0"
                        : ""}`}
        >
          <span className="absolute inset-0 overflow-hidden" style={{ clipPath: MUG_OUTLINE }}>
            <img src={path2Image} alt="" className="absolute max-w-none" style={imageInBoxStyle(MUG)} />
          </span>
        </span>
      </button>

      {/* A few faint wisps of steam above the rim */}
      {MUG_STEAM.map((x, index) => (
        <span
          key={x}
          className={`pointer-events-none absolute w-[0.8%] rounded-full bg-[radial-gradient(ellipse_at_50%_70%,rgba(255,240,225,0.5),transparent_70%)] blur-[3px]
                      transition-opacity duration-500
                      ${revealed ? "opacity-100 animate-[mug-steam_2.6s_ease-in-out_infinite] motion-reduce:animate-none" : "opacity-0"}`}
          style={{
            left: percent((x - 10) / IMAGE.width),
            top: percent(516 / IMAGE.height),
            height: percent(48 / IMAGE.height),
            animationDelay: `${index * 0.8}s`,
          }}
          aria-hidden="true"
        />
      ))}

      <span
        className="pointer-events-none absolute flex items-center justify-center [container-type:inline-size]"
        style={boxStyle(MUG_CAPTION)}
        aria-hidden="true"
      >
        <span
          className={`text-[4.2cqw] whitespace-nowrap italic text-[#fbf3e6]
                      [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_0_12px_rgba(0,0,0,0.6)]
                      transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none
                      ${revealed ? "translate-y-0 opacity-100 delay-150" : "translate-y-[0.3em] opacity-0"}`}
          style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif' }}
        >
          {MUG_LINE}
        </span>
      </span>
      <span className="sr-only" aria-live="polite">{revealed ? MUG_LINE : ""}</span>
    </>
  );
};

export const CabinDiscoveries = ({ active }) => (
  <>
    <PhotoDiscovery active={active} />
    <MugDiscovery active={active} />
  </>
);
