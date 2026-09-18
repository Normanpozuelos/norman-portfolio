import { RevealOnScroll } from "../RevealOnScroll"
export const About = () => {

    const frontendSkills = [  
        "HTML, CSS, JavaScript",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Responsive Design",
        "Git & GitHub",
    ];

    const backendSkills = [
        "Supabase",
        "PostgreSQL",
        "Authentication",
        "Row Level Security (RLS)",
        "REST APIs",
        "Data modeling",
    ];

    const mobileSkills = [
        "SwiftUI",
        "SwiftData",
        "Kotlin",
        "Jetpack Compose",
    ];

    return (
        <section id="about" className="min-h-screen flex items-center justify-center py-20">
            <RevealOnScroll>
            <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400
                bg-clip-text text-transparent text-center" >About me</h2>
                <div className="rounded-xl p-8 border-white/10 border hover:-translate-y-1 transition-all" >
                    <p className="text-gray-300 mb-6">
                        Hello! I'm a developer focused on building practical, user-friendly applications across web and mobile. 
                        My journey in development began with a fascination for how things work behind the scenes, 
                        and has grown from HTML and CSS into React, TypeScript, SwiftUI, Kotlin and Jetpack Compose. 
                        I also work with Supabase for backend services, authentication, PostgreSQL and Row Level Security. 
                        I enjoy bringing the different parts of an application together, from the user interface and experience 
                        to data and backend services.
                    </p>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                            <h3 className="text-xl font-semibold mb-4">Frontend Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {frontendSkills.map((skill, index) => (
                                    <span key={index} className="bg-blue-500/10 text-blue-500 py-1 px-3  rounded-full 
                                    text-sm  hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]
                                    transition">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                    
                        </div>
                   
                        <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                            <h3 className="text-xl font-semibold mb-4">Backend &amp; Data</h3>
                            <div className="flex flex-wrap gap-2">
                                {backendSkills.map((skill, index) => (
                                    <span key={index} className="bg-blue-500/10 text-blue-500 py-1 px-3  rounded-full 
                                    text-sm  hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]
                                    transition">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                    
                        </div>
                        <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                            <h3 className="text-xl font-semibold mb-4">Mobile Development</h3>
                            <div className="flex flex-wrap gap-2">
                                {mobileSkills.map((skill, index) => (
                                    <span key={index} className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 rounded-xl border border-white/10 p-6 transition-all hover:-translate-y-1 md:p-8">
                    <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-2xl font-bold">Experience &amp; Projects</h3>
                        <span className="text-sm text-cyan-300">2025-Present</span>
                    </div>
                    <div className="space-y-5 text-gray-300">
                        <div>
                            <h4 className="mb-2 text-lg font-semibold text-white">Guidance Fitness <span className="font-normal text-gray-400">- Personal Project</span></h4>
                            <p className="text-sm leading-relaxed">
                                Guidance grew from a simple gym problem: remembering a training plan and how to use unfamiliar exercises or machines. I built it as a training companion that keeps workouts accessible and makes exercises easier to understand.
                            </p>
                        </div>
                        <div className="grid gap-5 text-sm leading-relaxed md:grid-cols-2">
                            <div>
                                <h5 className="mb-2 font-semibold text-white">What I built</h5>
                                <ul className="list-disc space-y-1 pl-5">
                                    <li>iOS app with SwiftUI and SwiftData</li>
                                    <li>Android app with Kotlin and Jetpack Compose</li>
                                    <li>React dashboard for personal trainers</li>
                                    <li>Shared Supabase backend with authentication and localization in English, Norwegian, and Spanish</li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="mb-2 font-semibold text-white">What I learned</h5>
                                <p>
                                    I designed the architecture, data model, and user experience across platforms. The project taught me how UI, local state, authentication, synchronization, and backend data work together, including the distinction between recurring workout plans and completed sessions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </RevealOnScroll>
        </section>
    )
    }
