function KittLight() {
  return (
    <div className="relative w-[300px] h-[20px] bg-gray-800 rounded overflow-hidden shadow-inner">
      <div className="absolute top-0 h-full w-[20%] bg-red-600 rounded-full animate-kitt shadow-[0_0_20px_red]" />
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


