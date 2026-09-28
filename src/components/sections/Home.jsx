import { useRef } from "react"
import { RevealOnScroll } from "../RevealOnScroll"
import { HeroScene } from "./HeroScene"
import { useScrollProgress } from "../../hooks/useScrollProgress"

// Hero text is fully faded (and inert) after this share of the scroll track
const TEXT_FADE_END = 0.3

export const Home = () => {
    const trackRef = useRef(null)
    const textRef = useRef(null)

    useScrollProgress(trackRef, (progress) => {
        if (textRef.current) textRef.current.inert = progress >= TEXT_FADE_END
    })

    return (
        <>

        {/* Scroll track: the sticky viewport stays pinned while the page scrolls through it,
            and --p (0 → 1) drives the camera push. Reduced motion collapses it to one screen. */}
        <section id="home" ref={trackRef} className="relative h-[200svh] motion-reduce:h-svh" >
            <div className="sticky top-0 h-svh overflow-hidden">
            <HeroScene />
            <div ref={textRef}
                 style={{ opacity: `clamp(0, 1 - var(--p, 0) / ${TEXT_FADE_END}, 1)` }}
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
