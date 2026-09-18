import { useEffect, useState } from "react";
import { RevealOnScroll } from "./RevealOnScroll";
import homeImage from "../assets/Home.png";
import exerciseListImage from "../assets/exerciseList.png";
import exerciseDetailImage from "../assets/detail.png";
import progressImage from "../assets/progressScreen.png";
import workoutsImage from "../assets/SessionsWorkouts.png";
import androidHomeImage from "../assets/homeaAndroid.png";
import androidExerciseListImage from "../assets/exerciseListAndroid.png";
import androidExerciseDetailImage from "../assets/detailAndroid.png";
import androidProgressImage from "../assets/progressAndroid.png";
import androidWorkoutsImage from "../assets/workoutsAndroid.png";
import webpageImage from "../assets/Mainwebpage.png";
import inviteCustomerImage from "../assets/InviteCostumer.png";
import customerTrainingImage from "../assets/costumertraining.png";
import trainingSessionsImage from "../assets/training day sessions for costumer.png";

const screenshots = {
  iOS: [
    { src: homeImage, label: "Home" },
    { src: exerciseListImage, label: "Exercise library" },
    { src: exerciseDetailImage, label: "Exercise details" },
    { src: progressImage, label: "Progress" },
    { src: workoutsImage, label: "Workouts" },
  ],
  Android: [
    { src: androidHomeImage, label: "Home" },
    { src: androidExerciseListImage, label: "Exercise library" },
    { src: androidExerciseDetailImage, label: "Exercise details" },
    { src: androidProgressImage, label: "Progress" },
    { src: androidWorkoutsImage, label: "Workouts" },
  ],
  Webpage: [
    { src: webpageImage, label: "Main webpage" },
    { src: inviteCustomerImage, label: "Invite customer" },
    { src: customerTrainingImage, label: "Customer training" },
    { src: trainingSessionsImage, label: "Training day sessions" },
  ],
};

export function Projects() {
  const [platform, setPlatform] = useState("iOS");
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  const currentScreenshots = screenshots[platform];

  useEffect(() => {
    if (selectedScreenshot === null) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") setSelectedScreenshot(null);
      if (event.key === "ArrowLeft") {
        setSelectedScreenshot((currentIndex) => (currentIndex - 1 + currentScreenshots.length) % currentScreenshots.length);
      }
      if (event.key === "ArrowRight") {
        setSelectedScreenshot((currentIndex) => (currentIndex + 1) % currentScreenshots.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedScreenshot, platform, currentScreenshots.length]);

  function showPreviousScreenshot() {
    setSelectedScreenshot((currentIndex) => (currentIndex - 1 + currentScreenshots.length) % currentScreenshots.length);
  }

  function showNextScreenshot() {
    setSelectedScreenshot((currentIndex) => (currentIndex + 1) % currentScreenshots.length);
  }

  return (
    <section id="projects" className="py-24">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">Featured Projects</h2>
          <article className="overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-400/10 shadow-[0_2px_24px_rgba(59,130,246,0.15)]">
            <div className="grid gap-8 p-6 md:grid-cols-[0.9fr_1.1fr] md:p-10">
              <div>
                <p className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-cyan-300">Featured case study</p>
                <h3 className="mb-4 text-4xl font-bold text-white">Guidance</h3>
                <p className="mb-6 text-lg leading-relaxed text-gray-300">A training companion with tools for exploring exercises, reviewing workout sessions, and tracking progress.</p>
                <p className="mb-6 text-sm leading-relaxed text-gray-400">The project is presented across iOS and Android to show the same training experience on both platforms.</p>
                <div className="flex flex-wrap gap-2">
                  {["iOS", "Android", "Fitness", "Progress tracking"].map((tag) => (
                    <span key={tag} className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-300">{tag}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h4 className="font-semibold text-white">App screens</h4>
                  <div className="flex rounded-lg border border-white/10 bg-black/20 p-1" aria-label="Screenshot platform">
                    {["iOS", "Android", "Webpage"].map((option) => (
                      <button key={option} type="button" onClick={() => setPlatform(option)} className={`rounded-md px-3 py-1.5 text-sm transition-colors ${platform === option ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"}`}>{option}</button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {currentScreenshots.map((screenshot, index) => (
                      <button key={screenshot.src} type="button" onClick={() => setSelectedScreenshot(index)} className="group overflow-hidden rounded-xl border border-white/10 bg-black/30 text-left">
                        <img src={screenshot.src} alt={`Open Guidance ${platform} ${screenshot.label} screen`} className={`${platform === "Webpage" ? "aspect-[4/3] object-contain p-2" : "aspect-[9/19] object-cover object-top"} w-full transition duration-300 group-hover:scale-105`} loading="lazy" />
                        <span className="block px-3 py-2 text-xs text-gray-300">{screenshot.label}</span>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </article>
          {selectedScreenshot !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" role="dialog" aria-modal="true" aria-label={`${platform} screenshot viewer`} onClick={() => setSelectedScreenshot(null)}>
              <div className="relative flex max-h-[95vh] w-full max-w-5xl flex-col items-center rounded-2xl border border-white/10 bg-slate-950 p-4 shadow-2xl" onClick={(event) => event.stopPropagation()}>
                <div className="mb-3 flex w-full items-center justify-between gap-4">
                  <p className="text-sm text-gray-300">{currentScreenshots[selectedScreenshot].label}</p>
                  <button type="button" onClick={() => setSelectedScreenshot(null)} className="rounded-md px-3 py-1 text-2xl leading-none text-gray-300 hover:bg-white/10 hover:text-white" aria-label="Close screenshot viewer">&times;</button>
                </div>
                <img src={currentScreenshots[selectedScreenshot].src} alt={`Guidance ${platform} ${currentScreenshots[selectedScreenshot].label} screen`} className="max-h-[78vh] max-w-full object-contain" />
                <div className="mt-4 flex items-center justify-between gap-6">
                  <button type="button" onClick={showPreviousScreenshot} className="rounded-md border border-white/15 px-4 py-2 text-sm text-gray-200 hover:bg-white/10" aria-label="Previous screenshot">&larr; Previous</button>
                  <span className="text-xs text-gray-500">{selectedScreenshot + 1} / {currentScreenshots.length}</span>
                  <button type="button" onClick={showNextScreenshot} className="rounded-md border border-white/15 px-4 py-2 text-sm text-gray-200 hover:bg-white/10" aria-label="Next screenshot">Next &rarr;</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </RevealOnScroll>
    </section>
  );
}

