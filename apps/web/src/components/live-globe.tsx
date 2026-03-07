import { AsciiRenderer, Sphere, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { atom, useAtom } from "jotai";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

// --- State Management ---
type Coordinate = {
	id: string;
	lat: number;
	lng: number;
};

// Create the atom outside to be shareable if needed, though mostly internal here
export const activeCoordsAtom = atom<Coordinate[]>([]);

const useLiveCoords = () => {
	const [coords, setCoords] = useAtom(activeCoordsAtom);
	// We use a ref to track if we've initialized to avoid re-init on strict mode/remounts if desirable,
	// but here just simple effect is fine.
	const initialized = useRef(false);

	useEffect(() => {
		if (!initialized.current) {
			const initialCoords: Coordinate[] = Array.from({ length: 5 }).map(() => ({
				id: crypto.randomUUID(),
				lat: Math.random() * 180 - 90,
				lng: Math.random() * 360 - 180,
			}));
			setCoords(initialCoords);
			initialized.current = true;
		}

		const interval = setInterval(() => {
			setCoords((prev) => {
				const next = [...prev];
				// Randomly remove one
				if (next.length > 2 && Math.random() > 0.3) {
					const removeIndex = Math.floor(Math.random() * next.length);
					next.splice(removeIndex, 1);
				}
				// Randomly add one
				if (next.length < 12) {
					next.push({
						id: crypto.randomUUID(),
						lat: Math.random() * 180 - 90,
						lng: Math.random() * 360 - 180,
					});
				}
				return next;
			});
		}, 1500);

		return () => clearInterval(interval);
	}, [setCoords]);

	return coords;
};

// --- Math Utilities ---
// Convert lat/lng to 3D position on sphere
const latLngToVector3 = (lat: number, lng: number, radius: number) => {
	// Three.js uses a Y-up coordinate system
	// lat: -90 to 90 (phi: 180 to 0)
	// lng: -180 to 180 (theta)

	const phi = THREE.MathUtils.degToRad(90 - lat);
	const theta = THREE.MathUtils.degToRad(lng + 180);

	const x = -(radius * Math.sin(phi) * Math.cos(theta));
	const z = radius * Math.sin(phi) * Math.sin(theta);
	const y = radius * Math.cos(phi);

	return new THREE.Vector3(x, y, z);
};

const RotatingEarth = () => {
	const groupRef = useRef<THREE.Group>(null);
	const coords = useLiveCoords();
	const radius = 2.5; // Increased size further for better resolution

	// Use a high-contrast map for better ASCII separation (no clouds, clear land/water)
	const texture = useTexture(
		"https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
	);

	useFrame((_, delta) => {
		if (groupRef.current) {
			groupRef.current.rotation.y += delta * 0.15;
		}
	});

	return (
		<group ref={groupRef}>
			{/* Base Earth Sphere with Texture */}
			<Sphere args={[radius, 64, 64]}>
				<meshStandardMaterial
					map={texture}
					color="white"
					roughness={0.8}
					metalness={0.2}
				/>
			</Sphere>

			{/* Markers */}
			{coords.map((coord) => {
				const pos = latLngToVector3(coord.lat, coord.lng, radius);
				return (
					<mesh key={coord.id} position={pos}>
						{/* Make markers slightly larger and stick out more */}
						<sphereGeometry args={[0.15, 8, 8]} />
						{/* Bright neon green for visibility in ASCII */}
						<meshBasicMaterial color="#22c55e" />
					</mesh>
				);
			})}
		</group>
	);
};

export function LiveGlobe() {
	return (
		<div className="flex h-full min-h-[300px] w-full min-w-[300px] items-center justify-center">
			<Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
				<color attach="background" args={["black"]} />
				{/* 
                    Lighting is crucial for ASCII. 
                    We need strong directional light to create contrast, 
                    but enough ambient so the "dark side" isn't totally invisible if we want full shape.
                */}
				<ambientLight intensity={2} />
				<pointLight position={[10, 10, 10]} intensity={2} />
				<Suspense fallback={null}>
					<RotatingEarth />
				</Suspense>
				<AsciiRenderer
					fgColor="var(--foreground)"
					bgColor="transparent"
					// @ts-expect-error - resolution exists in drei types but might be flagged
					resolution={0.35} // Higher resolution = smaller, denser characters
					// Use a character set that gives good density range
					characters=" .:-+*=%@#"
					invert={false} // Ensure dark (water) is empty/sparse, light (land) is dense
				/>
			</Canvas>
		</div>
	);
}
