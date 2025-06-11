export function Projects() {
  return (
    <section id="projects" className="min-h-screen flex items-center justify-center py-20">
        <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400
            bg-clip-text text-transparent text-center">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols2 gap-6">
                <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 
                                hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]">
                    <h3 className="text-xl font-bold mb-2">Scorer board</h3>
                    <p className="text-gray-400 mb-4">
                        A simple scoreboard app built with React.js and Tailwind CSS. 
                        It allows users to keep track of scores in a game or activity.
                    </p>
                    <div>
                        {["React", "Tailwind", "CSS", "JavaScript"].map((skill, key) => (
                            <span key={key} className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full 
                            text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)]
                            transition-all">
                                {skill}
                            </span>
                        ))}
                    </div>
                    <div className="flex justify-between items-center">
                    <a href="#" className="text-blue-400 hover:text-red-600 transition-colors">View Project →</a>

                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

