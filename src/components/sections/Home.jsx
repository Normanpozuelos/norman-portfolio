import { useRef, useState } from "react"
import { RevealOnScroll } from "../RevealOnScroll"
import { HeroScene } from "./HeroScene"
import { CabinScene } from "./CabinScene"
import { useScrollProgress } from "../../hooks/useScrollProgress"

// Journey stages in scroll order; lengths are in svh of scrolling. Each stage's own
// 0 → 1 progress is available in CSS as var(--<name>).
const STAGES = [
    { name: "push", length: 100 },   // Path 1: camera pushes toward the cabin
    { name: "arrive", length: 50 },  // Cabin interior fades in over Path 1
    { name: "cabin", length: 60 },   // Path 2 holds still so the notebook can be discovered
]
const TRACK_HEIGHT = `${100 + STAGES.reduce((sum, stage) => sum + stage.length, 0)}svh`

// Hero text is fully faded (and inert) after this share of the push stage
const TEXT_FADE_END = 0.3

// Handoff into the cabin: a short window of the arrive stage where Path 1 cuts to Path 2.
// --handoff runs 0 → 1 across the window; --dip goes 0 → 1 → 0, peaking at the cut, and
// drives a warm dim (lower brightness + sepia) on both scenes so the cut never shows black.
const HANDOFF_START = 0.5
const HANDOFF_LENGTH = 0.1
const HANDOFF_VARS = {
    "--handoff": `clamp(0, (var(--arrive, 0) - ${HANDOFF_START}) / ${HANDOFF_LENGTH}, 1)`,
    "--dip": "calc(min(var(--handoff), 1 - var(--handoff)) * 2)",
    "--dip-filter": "brightness(calc(1 - 0.45 * var(--dip))) sepia(calc(0.35 * var(--dip)))",
}
// Path 2 is interactive once the handoff has finished
const ARRIVED_AT = HANDOFF_START + HANDOFF_LENGTH

export const Home = () => {
    const trackRef = useRef(null)
    const textRef = useRef(null)
    const [arrived, setArrived] = useState(false)

    useScrollProgress(trackRef, STAGES, (progress, stage) => {
        if (textRef.current) textRef.current.inert = stage.push >= TEXT_FADE_END
        setArrived(stage.arrive >= ARRIVED_AT)
    })

    return (
        <>

        {/* Scroll track: the sticky viewport stays pinned while the page scrolls through it,
            and the stage variables drive the scenes. Reduced motion collapses it to one screen. */}
        <section id="home" ref={trackRef} style={{ "--track-height": TRACK_HEIGHT, ...HANDOFF_VARS }}
                 className="relative h-(--track-height) motion-reduce:h-svh" >
            <div className="sticky top-0 h-svh overflow-hidden">
            <HeroScene />
            <CabinScene arrived={arrived} />
            <div ref={textRef}
                 style={{ opacity: `clamp(0, 1 - var(--push, 0) / ${TEXT_FADE_END}, 1)` }}
                 className="relative z-10 flex min-h-svh flex-col justify-between px-6 pt-20 pb-10
                            md:justify-start md:px-[8vw] md:pt-[max(5rem,13svh)] md:pb-0">
                <RevealOnScroll>
                <div className="relative isolate max-w-md">
                    {/* Local shade behind the title and scanner only, so the sunset stays bright elsewhere */}
                    <div className="pointer-events-none absolute -inset-x-12 -inset-y-10 -z-10
                                    bg-[radial-gradient(closest-side,rgba(2,6,23,0.72),rgba(2,6,23,0.4)_60%,transparent)]"
                         aria-hidden="true" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-300
                                   text-transparent bg-clip-text
                                   [filter:drop-shadow(0_1px_1px_rgba(2,6,23,0.9))_drop-shadow(0_0_14px_rgba(2,6,23,0.7))]
                                  leading-tight ">
                        Welcome to My Portfolio</h1>
                </div>
                </RevealOnScroll>
                <RevealOnScroll>
                <div className="max-w-md">
                    <p className="text-gray-200 text-lg mb-6">Explore my projects and skills</p>
                    <div className="flex flex-wrap gap-4">
                     <a href="#projects"
                     className="bg-white text-gray-900 px-6 py-3 rounded-full hover:bg-gray-200 transition-colors
                                hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.4)]">
                        View Projects</a>


                    </div>
                </div>
                </RevealOnScroll>
            </div>
            </div>
        </section>
        </>
    )
}
