import { RevealOnScroll } from "../RevealOnScroll"
export const About = () => {

    const frontendSkills = [  
        "HTML, CSS, JavaScript",
        "React.js",
        "Responsive Design",
        "Version Control with Git",
        "Typescript, Tailwind CSS",
    ];

    const backendSkills = ["Node.js", "Express.js",   ];

    return (
        <section id="about" className="min-h-screen flex items-center justify-center py-20">
            <RevealOnScroll>
            <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400
                bg-clip-text text-transparent text-center" >About me</h2>
                <div className="rounded-xl p-8 border-white/10 border hover:-translate-y-1 transition-all" >
                    <p className="text-gray-300 mb-6">
                        Hello! I'm learning to be a web developer and I have a focus for creating dynamic and responsive websites. 
                        My journey in web development began with a fascination for how things work behind the scenes, 
                        and it has evolved from basic HTML and CSS to learn Typescript and React. I specialize in building user-friendly interfaces 
                        and ensuring seamless user experiences across devices.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <h3 className="text-xl font-semibold mb-4">Backend Skills</h3>
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
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all ">
                        <h3 className="text-xl font-bold mb-4">📚 Education ✏️</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li className="mb-2">
                                <strong>Coursera Front end Development</strong> - Online Course, 2023
                            </li>
                            <li className="mb-2">
                                <strong>React, Tailwind, Typescript</strong> - Online Course, 2023
                            </li>
                            <li className="mb-2">
                                <strong>High School Diploma</strong> - ABC High School, 2018
                            </li>
                        </ul>
                    </div>
                    <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all ">
                        <h3 className="text-xl font-bold mb-4">💼 Work experience 🛠️</h3>
                        <div className="space-y-4 text-gray-300">
                            <div>
                                <strong>Web Development Intern</strong> - XYZ Company, 2023
                                <p className="text-sm">Assisted in developing and maintaining company website using React and Tailwind CSS.</p>
                            </div>
                            <div>
                                <strong>Freelance Web Developer</strong> - 2022-Present
                                <p className="text-sm">Worked on various projects including personal blogs and small business websites.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </RevealOnScroll>
        </section>
    )
    }
