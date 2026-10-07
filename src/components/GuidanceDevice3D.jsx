import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

function roundedRect(width, height, radius) {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

function Device({ platform, screen }) {
  const device = useRef(null);
  const drag = useRef({ active: false, x: 0, y: 0 });
  const rotation = useRef({ x: -0.035, y: -0.16, targetX: -0.035, targetY: -0.16 });
  const texture = useLoader(THREE.TextureLoader, screen);
  const laptop = platform === "PT Dashboard";
  const android = platform === "Android";
  const width = laptop ? 3.25 : 1.16;
  const height = laptop ? 2.08 : 2.46;
  const depth = laptop ? 0.09 : 0.13;

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  useEffect(() => {
    const endDrag = () => { drag.current.active = false; };
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    return () => {
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, []);

  useFrame((_, delta) => {
    if (!device.current) return;
    const state = rotation.current;
    const ease = 1 - Math.exp(-delta * 8);
    state.x += (state.targetX - state.x) * ease;
    state.y += (state.targetY - state.y) * ease;
    device.current.rotation.x = state.x;
    device.current.rotation.y = state.y;
  });

  function startDrag(event) {
    event.stopPropagation();
    event.target.setPointerCapture?.(event.pointerId);
    drag.current = { active: true, x: event.clientX, y: event.clientY };
  }

  function moveDrag(event) {
    if (!drag.current.active) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    drag.current.x = event.clientX;
    drag.current.y = event.clientY;
    const state = rotation.current;
    state.targetY = THREE.MathUtils.clamp(state.targetY + dx * 0.009, -0.92, 0.92);
    state.targetX = THREE.MathUtils.clamp(state.targetX + dy * 0.006, -0.35, 0.35);
  }

  const bodyGeometry = useMemo(() => {
    const geometry = new THREE.ExtrudeGeometry(roundedRect(width, height, laptop ? 0.12 : 0.19), {
      depth, bevelEnabled: true, bevelSegments: 4, steps: 1,
      bevelSize: laptop ? 0.025 : 0.035, bevelThickness: 0.025, curveSegments: 12,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }, [width, height, depth, laptop]);

  if (laptop) {
    const screenWidth = 2.94;
    const screenHeight = 1.66;
    const imageAspect = texture.image ? texture.image.width / texture.image.height : 1;
    const fittedWidth = Math.min(screenWidth - 0.08, (screenHeight - 0.08) * imageAspect);
    const fittedHeight = fittedWidth / imageAspect;
    return (
      <group ref={device} onPointerDown={startDrag} onPointerMove={moveDrag}>
        {/* Display lid */}
        <group position={[0, 0.48, 0]}>
          <mesh geometry={bodyGeometry} castShadow>
            <meshStandardMaterial color="#090d14" metalness={0.78} roughness={0.27} />
          </mesh>
          {/* ExtrudeGeometry's front bevel reaches z=0.07; keep the glass above it. */}
          <mesh position={[0, 0, 0.078]} renderOrder={2}>
            <shapeGeometry args={[roundedRect(screenWidth, screenHeight, 0.055)]} />
            <meshBasicMaterial color="#020407" side={THREE.DoubleSide} />
          </mesh>
          {/* PlaneGeometry provides full-image UVs; fit to image aspect so browser chrome stays intact. */}
          <mesh position={[0, 0, 0.082]} renderOrder={3}>
            <planeGeometry args={[fittedWidth, fittedHeight]} />
            <meshBasicMaterial map={texture} color="#ffffff" toneMapped={false} />
          </mesh>
          <mesh position={[0, -screenHeight / 2 + 0.025, 0.085]} renderOrder={4}>
            <circleGeometry args={[0.009, 16]} /><meshBasicMaterial color="#172635" />
          </mesh>
        </group>
        {/* Tapered aluminum keyboard deck, trackpad and red status detail */}
        <mesh position={[0, -0.67, 0.02]} rotation={[-0.08, 0, 0]} castShadow>
          <boxGeometry args={[3.48, 0.12, 1.38]} />
          <meshStandardMaterial color="#151c25" metalness={0.82} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.599, -0.31]}>
          <boxGeometry args={[2.84, 0.014, 0.52]} />
          <meshStandardMaterial color="#080c12" metalness={0.4} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.595, 0.36]}>
          <boxGeometry args={[0.82, 0.012, 0.43]} />
          <meshStandardMaterial color="#202b37" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh position={[1.67, -0.59, -0.42]}>
          <sphereGeometry args={[0.018, 12, 12]} /><meshBasicMaterial color="#ed3542" />
        </mesh>
      </group>
    );
  }

  const screenWidth = android ? 0.99 : 0.958;
  const screenHeight = android ? 2.15 : 2.145;
  return (
    <group ref={device} onPointerDown={startDrag} onPointerMove={moveDrag}>
      <mesh geometry={bodyGeometry} castShadow receiveShadow>
        <meshStandardMaterial color={android ? "#10151d" : "#090c12"} metalness={0.82} roughness={0.24} />
      </mesh>
      <mesh position={[0, 0, 0.198]}>
        <shapeGeometry args={[roundedRect(width - 0.035, height - 0.035, android ? 0.14 : 0.18)]} />
        <meshBasicMaterial color="#193650" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0.201]}>
        <shapeGeometry args={[roundedRect(android ? 1.025 : 0.99, 2.19, android ? 0.15 : 0.135)]} />
        <meshBasicMaterial color="#020306" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0.204]}>
        <planeGeometry args={[screenWidth, screenHeight]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {android ? (
        <mesh position={[0, 1.04, 0.207]}>
          <circleGeometry args={[0.025, 24]} /><meshBasicMaterial color="#030609" />
        </mesh>
      ) : (
        <>
          <mesh position={[0, 1.025, 0.207]}>
            <shapeGeometry args={[roundedRect(0.29, 0.075, 0.038)]} /><meshBasicMaterial color="#030407" side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0.085, 1.025, 0.208]}>
            <circleGeometry args={[0.018, 20]} /><meshBasicMaterial color="#173452" />
          </mesh>
        </>
      )}
      <mesh position={[-0.594, 0.48, 0]}><boxGeometry args={[0.035, 0.24, 0.07]} /><meshStandardMaterial color="#222a34" metalness={0.8} roughness={0.3} /></mesh>
      <mesh position={[-0.594, 0.15, 0]}><boxGeometry args={[0.035, 0.24, 0.07]} /><meshStandardMaterial color="#222a34" metalness={0.8} roughness={0.3} /></mesh>
      <mesh position={[0.594, 0.35, 0]}><boxGeometry args={[0.035, 0.4, 0.07]} /><meshStandardMaterial color="#222a34" metalness={0.8} roughness={0.3} /></mesh>
      <mesh position={[0, -1.13, 0.04]}><boxGeometry args={[0.12, 0.018, 0.02]} /><meshBasicMaterial color="#e53340" /></mesh>
    </group>
  );
}

export function GuidanceDevice3D({ platform, screen }) {
  const laptop = platform === "PT Dashboard";
  const android = platform === "Android";
  return (
    <div className="relative isolate mb-6 overflow-hidden rounded-2xl border border-cyan-400/15 bg-[radial-gradient(ellipse_at_50%_42%,rgba(15,42,67,0.48),rgba(3,7,13,0.97)_72%)] shadow-[inset_0_0_40px_rgba(34,211,238,0.025)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
      <Canvas
        key={platform}
        aria-label={`Interactive 3D ${laptop ? "laptop" : android ? "Android phone" : "iPhone"} showing the Guidance ${platform} screen. Drag to rotate.`}
        camera={{ position: [0, 0, laptop ? 6.8 : 5.4], fov: laptop ? 34 : 34 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        className="!h-[330px] touch-none sm:!h-[430px] md:!h-[460px]"
      >
        <ambientLight intensity={0.72} />
        <directionalLight position={[-3, 3, 4]} intensity={1.7} color="#d8efff" />
        <pointLight position={[2, 0.5, 1]} intensity={1.25} color="#168cff" />
        <pointLight position={[-2, -1, -1]} intensity={0.2} color="#ef3340" />
        {/* Independent warm edge fill: about 16% of the main cool light. */}
        <pointLight position={[-2.5, 1.8, 3]} intensity={0.28} color="#d9b98f" />
        <Suspense fallback={null}><Device platform={platform} screen={screen} /></Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-center gap-2 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-100/65 sm:text-xs">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.65)]" />
        {laptop ? "Drag to rotate laptop" : "Drag to rotate"}
      </div>
    </div>
  );
}
