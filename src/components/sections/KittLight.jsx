function KittLight() {
  return (
    <div className="relative w-full max-w-md h-[20px] bg-gray-800 rounded overflow-hidden shadow-inner mx-auto my-4">
  {/* Light group */}
  <div className="absolute top-0 left-0 h-full w-[40%] animate-kitt flex items-center justify-center gap-[4px]">

    {/* Fading trail (behind) */}
    <div className="w-[8px] h-[8px] bg-red-500 rounded-full opacity-20 blur-[3px] transition-opacity duration-200" />
    <div className="w-[8px] h-[8px] bg-red-500 rounded-full opacity-40 blur-[2px] transition-opacity duration-200" />

    {/* Main lights with white cores */}
    <div className="w-[10px] h-[10px] bg-red-600 rounded-full relative shadow-[0_0_10px_red]">
      <div className="absolute inset-0.5 bg-white rounded-full opacity-100 blur-[0.5px]" />
    </div>
    <div className="w-[10px] h-[10px] bg-red-600 rounded-full relative shadow-[0_0_10px_red]">
      <div className="absolute inset-0.5 bg-white rounded-full opacity-100 blur-[0.5px]" />
    </div>
    <div className="w-[10px] h-[10px] bg-red-600 rounded-full relative shadow-[0_0_10px_red]">
      <div className="absolute inset-1 bg-white rounded-full opacity-50 blur-[1px]" />
    </div>
    <div className="w-[10px] h-[10px] bg-red-600 rounded-full relative shadow-[0_0_10px_red]">
      <div className="absolute inset-1 bg-white rounded-full opacity-50 blur-[1px]" />
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