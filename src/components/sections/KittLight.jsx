function KittLight({ className = "w-full max-w-md h-[20px] mx-auto my-4" }) {
  return (
    <div className={`relative bg-neutral-950/90 ring-1 ring-white/10 rounded overflow-hidden [container-type:inline-size] shadow-[inset_0_2px_6px_rgba(0,0,0,0.8),0_2px_10px_rgba(0,0,0,0.5)] ${className}`}>
  {/* Light group */}
  <div className="absolute top-0 left-0 h-full w-[40%] animate-kitt flex items-center justify-center gap-[1.6cqw]">
    {/* Sizes are in cqw (% of the track width) so the lights scale with the scanner */}

    {/* Fading trail (behind) */}
    <div className="w-[3.6cqw] h-[3.6cqw] bg-red-500 rounded-full opacity-20 blur-[1.35cqw] transition-opacity duration-200" />
    <div className="w-[3.6cqw] h-[3.6cqw] bg-red-500 rounded-full opacity-40 blur-[0.9cqw] transition-opacity duration-200" />

    {/* Main lights with white cores */}
    <div className="w-[4.5cqw] h-[4.5cqw] bg-red-600 rounded-full relative shadow-[0_0_2.7cqw_0.45cqw_rgba(248,113,113,0.95),0_0_6.3cqw_1.35cqw_rgba(220,38,38,0.7)]">
      <div className="absolute inset-[20%] bg-white rounded-full opacity-100 blur-[0.2cqw]" />
    </div>
    <div className="w-[4.5cqw] h-[4.5cqw] bg-red-600 rounded-full relative shadow-[0_0_2.7cqw_0.45cqw_rgba(248,113,113,0.95),0_0_6.3cqw_1.35cqw_rgba(220,38,38,0.7)]">
      <div className="absolute inset-[20%] bg-white rounded-full opacity-100 blur-[0.2cqw]" />
    </div>
    <div className="w-[4.5cqw] h-[4.5cqw] bg-red-600 rounded-full relative shadow-[0_0_2.7cqw_0.45cqw_rgba(248,113,113,0.95),0_0_6.3cqw_1.35cqw_rgba(220,38,38,0.7)]">
      <div className="absolute inset-[30%] bg-white rounded-full opacity-50 blur-[0.45cqw]" />
    </div>
    <div className="w-[4.5cqw] h-[4.5cqw] bg-red-600 rounded-full relative shadow-[0_0_2.7cqw_0.45cqw_rgba(248,113,113,0.95),0_0_6.3cqw_1.35cqw_rgba(220,38,38,0.7)]">
      <div className="absolute inset-[30%] bg-white rounded-full opacity-50 blur-[0.45cqw]" />
    </div>
  </div>
</div>


  );
}

export default KittLight;


/**
 * function App() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <KittLight />
    </div>
  );
}
 * 
 */


<div className="relative w-full max-w-md h-[20px] bg-gray-800 rounded overflow-hidden shadow-inner mx-auto my-4">
      <div className="absolute top-0 h-full w-[20%] bg-red-600 rounded-full animate-kitt shadow-[0_0_20px_red]" />
    </div>