
export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
    return (
      <div
        className={`fixed top-0 left-0 w-full h-screen z-50 bg-[rgba(10,10,10,0.9)] 
        flex flex-col items-center justify-center
        transition-all duration-300 ease-in-out
        ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Close button (×) */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-white text-3xl cursor-pointer z-50"
        >
          &times;
        </button>
  
        {/* Optional: Menu content */}
        <div className="text-white text-xl mt-4">Mobile Menu</div>
      </div>
    );
  };
  
//39 not working x button