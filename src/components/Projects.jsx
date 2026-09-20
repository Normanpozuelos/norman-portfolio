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
import gameHubHomeImage from "../assets/gameHubHome.png";
import gameHubPlatformsImage from "../assets/gameHubPlatforms.png";
import gameHubOrderByImage from "../assets/gameHubOrderby.png";
import gameHubDetailImage from "../assets/gameHubDetailView.png";

const guidanceScreenshots = {
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

const gameHubScreenshots = {
  Screens: [
    { src: gameHubHomeImage, label: "Home" },
    { src: gameHubPlatformsImage, label: "Platform filter" },
    { src: gameHubOrderByImage, label: "Sort order" },
    { src: gameHubDetailImage, label: "Game details" },
  ],
};

const linkStyles = {
  appstore: { card: "border-blue-500/40 bg-blue-500/10 hover:border-blue-400 hover:bg-blue-500/20", icon: "bg-blue-500" },
  globe: { card: "border-emerald-500/40 bg-emerald-500/10 hover:border-emerald-400 hover:bg-emerald-500/20", icon: "bg-emerald-500" },
  github: { card: "border-indigo-500/40 bg-indigo-500/10 hover:border-indigo-400 hover:bg-indigo-500/20", icon: "bg-transparent" },
};

function LinkIcon({ type, className }) {
  if (type === "appstore") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 4.5 8 11.5M12 4.5l5 9M5.5 15.5h5M14 15.5h4.5M8.5 19.5l3-5.5" />
      </svg>
    );
  }
  if (type === "globe") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18M4.5 7.5h15M4.5 16.5h15" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className ?? "h-11 w-11"} fill="white" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function ProjectCard({ eyebrow, title, name, descriptions, tags, links = [], screenshots, wideGroups = [] }) {
  const groups = Object.keys(screenshots);
  const [platform, setPlatform] = useState(groups[0]);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  const currentScreenshots = screenshots[platform];
  const isWide = wideGroups.includes(platform);

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
    <>
      <article className="overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-400/10 shadow-[0_2px_24px_rgba(59,130,246,0.15)]">
        <div className="grid gap-8 p-6 md:grid-cols-[0.9fr_1.1fr] md:p-10">
          <div>
            <p className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</p>
            <h3 className="mb-4 text-4xl font-bold text-white">{title}</h3>
            {descriptions.map((description, index) => (
              <p key={index} className={index === 0 ? "mb-6 text-lg leading-relaxed text-gray-300" : "mb-6 text-sm leading-relaxed text-gray-400"}>{description}</p>
            ))}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-300">{tag}</span>
              ))}
            </div>
            {links.length > 0 && links.every((link) => link.icon) && (
              <div className="mt-6 space-y-3">
                {links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={`group flex items-center gap-4 rounded-xl border p-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${linkStyles[link.icon].card}`}>
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${linkStyles[link.icon].icon}`}>
                      <LinkIcon type={link.icon} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-white">{link.label}</span>
                      <span className="block text-sm text-gray-400">{link.subtitle}</span>
                    </span>
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-gray-300 transition-colors group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                    </svg>
                  </a>
                ))}
              </div>
            )}
            {links.length > 0 && !links.every((link) => link.icon) && (
              <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium">
                {links.map((link, index) => (
                  <span key={link.href} className="flex items-center gap-2">
                    {index > 0 && <span className="text-gray-600" aria-hidden="true">&middot;</span>}
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-cyan-300 underline decoration-cyan-300/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white">{link.label} &#8599;</a>
                  </span>
                ))}
              </p>
            )}
          </div>
          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h4 className="font-semibold text-white">{groups.length > 1 ? "App screens" : "Screenshots"}</h4>
              {groups.length > 1 && (
                <div className="flex rounded-lg border border-white/10 bg-black/20 p-1" aria-label="Screenshot platform">
                  {groups.map((option) => (
                    <button key={option} type="button" onClick={() => setPlatform(option)} className={`rounded-md px-3 py-1.5 text-sm transition-colors ${platform === option ? "bg-blue-500 text-white" : "text-gray-400 hover:text-white"}`}>{option}</button>
                  ))}
                </div>
              )}
            </div>
            <div className={`grid gap-3 ${isWide ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
              {currentScreenshots.map((screenshot, index) => (
                <button key={screenshot.src} type="button" onClick={() => setSelectedScreenshot(index)} className="group overflow-hidden rounded-xl border border-white/10 bg-black/30 text-left">
                  <img src={screenshot.src} alt={`Open ${name} ${screenshot.label} screen`} className={`${isWide ? "aspect-[4/3] object-contain p-2" : "aspect-[9/19] object-cover object-top"} w-full transition duration-300 group-hover:scale-105`} loading="lazy" />
                  <span className="block px-3 py-2 text-xs text-gray-300">{screenshot.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </article>
      {selectedScreenshot !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" role="dialog" aria-modal="true" aria-label={`${name} screenshot viewer`} onClick={() => setSelectedScreenshot(null)}>
          <div className="relative flex max-h-[95vh] w-full max-w-5xl flex-col items-center rounded-2xl border border-white/10 bg-slate-950 p-4 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex w-full items-center justify-between gap-4">
              <p className="text-sm text-gray-300">{currentScreenshots[selectedScreenshot].label}</p>
              <button type="button" onClick={() => setSelectedScreenshot(null)} className="rounded-md px-3 py-1 text-2xl leading-none text-gray-300 hover:bg-white/10 hover:text-white" aria-label="Close screenshot viewer">&times;</button>
            </div>
            <img src={currentScreenshots[selectedScreenshot].src} alt={`${name} ${currentScreenshots[selectedScreenshot].label} screen`} className="max-h-[78vh] max-w-full object-contain" />
            <div className="mt-4 flex items-center justify-between gap-6">
              <button type="button" onClick={showPreviousScreenshot} className="rounded-md border border-white/15 px-4 py-2 text-sm text-gray-200 hover:bg-white/10" aria-label="Previous screenshot">&larr; Previous</button>
              <span className="text-xs text-gray-500">{selectedScreenshot + 1} / {currentScreenshots.length}</span>
              <button type="button" onClick={showNextScreenshot} className="rounded-md border border-white/15 px-4 py-2 text-sm text-gray-200 hover:bg-white/10" aria-label="Next screenshot">Next &rarr;</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">Featured Projects</h2>
          <div className="space-y-10">
            <ProjectCard
              eyebrow="Featured case study"
              title="Guidance"
              name="Guidance"
              descriptions={[
                "A training companion with tools for exploring exercises, reviewing workout sessions, and tracking progress.",
                "The project is presented across iOS and Android to show the same training experience on both platforms. I built the applications around a shared backend so training data, accounts, and progress can work consistently across the different parts of the platform.",
              ]}
              tags={["SwiftUI", "SwiftData", "Kotlin", "Jetpack Compose", "Next.js", "Supabase", "RLS", "Edge Functions", "Google Auth", "Localization"]}
              links={[
                { label: "Guidance on the App Store", subtitle: "Download the iOS app", icon: "appstore", href: "https://apps.apple.com/us/app/guidance-fitness/id6793653135" },
                { label: "Live PT Dashboard", subtitle: "Web application for personal trainers", icon: "globe", href: "https://guidance-pt-dashboard.vercel.app/" },
                { label: "Dashboard Source Code", subtitle: "View the code on GitHub", icon: "github", href: "https://github.com/Normanpozuelos/guidance-pt-dashboard-public" },
              ]}
              screenshots={guidanceScreenshots}
              wideGroups={["Webpage"]}
            />
            <ProjectCard
              eyebrow="Course project"
              title="Game Hub"
              name="Game Hub"
              descriptions={[
                "A game discovery application built with React and TypeScript while following Mosh Hamedani's Game Hub course.",
                "I built it alongside the course, writing and debugging each part myself, to get hands-on experience with external APIs, reusable components, custom hooks, TanStack Query, Zustand, React Router, filtering, searching, and sorting. Where newer library versions or the Vercel deployment setup differed from the course, I adapted the code to make it work. The application retrieves game data from the RAWG API and is deployed with Vercel.",
              ]}
              tags={["React", "TypeScript", "TanStack Query", "Zustand", "React Router", "RAWG API", "Vercel"]}
              links={[
                { label: "Game Hub Live Demo", subtitle: "Try the app in your browser", icon: "globe", href: "https://game-hub-three-lime.vercel.app/" },
                { label: "Game Hub Source Code", subtitle: "View the code on GitHub", icon: "github", href: "https://github.com/Normanpozuelos/game-hub" },
              ]}
              screenshots={gameHubScreenshots}
              wideGroups={["Screens"]}
            />
            <div className="-mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5">
              <h3 className="mb-2 text-xl font-bold text-white">Portfolio Source Code</h3>
              <p className="mb-4 text-sm leading-normal text-gray-400">A React portfolio showcasing my projects, development journey, and interactive UI experiments. The site opens with a simple &ldquo;Hello World&rdquo; and evolves through visual themes inspired by AI, Android, and KITT.</p>
              <a href="https://github.com/Normanpozuelos/norman-portfolio" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-indigo-400 hover:bg-indigo-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                <LinkIcon type="github" className="h-5 w-5" />
                View Portfolio Source Code &#8599;
              </a>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
