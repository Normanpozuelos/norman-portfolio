import { useEffect } from "react";
import KittLight from "./sections/KittLight";

export const Navbar = ({menuOpen, setMenuOpen}) => {

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "auto";
    }, [menuOpen]);

    return (
        <nav className="fixed top-0 w-full z-40 bg-[rgba(10, 10, 10, 0.8)] 
        backdrop-blur-lg border-b border-white/10 shadow-lg">
            {/* Centered on the nav itself (full viewport width), independent of the logo and links.
                Hidden below sm so it never crowds the logo or hamburger on phones. */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block" aria-hidden="true">
                <KittLight className="h-3.5 w-32 md:w-28 lg:w-40" />
            </div>
            <div className="container mx-w-5xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                
                    <a href="#home" className="font-mono text-xl font-bold text-white">
                        norman<span className="text-blue-500">.dev</span>
                    </a>
                    <div className="w-7 h-5 relative cursor-pointer z-40 md:hidden" 
                    onClick={() => setMenuOpen((prev) => !prev) } >
                        &#9776; {/* Hamburger icon */}
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
                        <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
                        <a href="#projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
                        <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
                    </div>
                
            </div>
            </div>
        </nav>
    );
}
