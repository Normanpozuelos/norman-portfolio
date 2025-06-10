import KittLight from "./KittLight"

export const Home = () => {
    return (
        <>
        
        <section id="home" className="min-h-screen flex items-center justify-center relative" >
            
            <div className="text-center z-10  px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 
                               text-transparent bg-clip-text
                              leading-right ">
                    Welcome to My Portfolio</h1>
                    <KittLight />
                <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">Explore my projects and skills</p>
                <div className="flex justify-center space-x-4">               
                 <a href="#projects" 
                 className="bg-white text-gray-900 px-6 py-3 rounded-full hover:bg-gray-200 transition-colors
                            hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.4)]">
                    View Projects</a>
                    <a href="#contact" 
                 className="border border-blue-500/50 text-blue-500 py-3 px-6 rounded-full font-medium
                           transition all duration-200 ease-in-out
                           hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.4)]
                           hover:bg-blue-500/10">
                    Contact me</a>


                </div>
            </div>
        </section>
        </>
    )
}