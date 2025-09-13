
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";


const MobileControl=()=>{
 return <OrbitControls enableZoom={false} />
}
function Controls() {
    const { camera } = useThree();
    const speed = 0.05;       // movement speed
    const turnSpeed = 0.03;   // rotation speed
    const [keys, setKeys] = useState({});

    useEffect(() => {
        const handleKeyDown = (e) => setKeys((k) => ({ ...k, [e.key.toLowerCase()]: true }));
        const handleKeyUp = (e) => setKeys((k) => ({ ...k, [e.key.toLowerCase()]: false }));

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    useFrame(() => {
        const direction = new THREE.Vector3();

        if (keys["w"]) {
            camera.getWorldDirection(direction);
            camera.position.addScaledVector(direction, speed);
        }
        if (keys["s"]) {
            camera.getWorldDirection(direction);
            camera.position.addScaledVector(direction, -speed);
        }
        if (keys["a"]) {
            camera.rotation.y += turnSpeed; // rotate left
        }
        if (keys["d"]) {
            camera.rotation.y -= turnSpeed; // rotate right
        }

        // keep inside cube bounds
        const margin = 0.2;
        camera.position.x = THREE.MathUtils.clamp(camera.position.x, -2 + margin, 2 - margin);
        camera.position.z = THREE.MathUtils.clamp(camera.position.z, -2 + margin, 2 - margin);
    });

    return null;
    
}
function Wall({ url, position, rotation }) {
    const texture = useLoader(THREE.TextureLoader, url);
    return (
        <mesh position={position} rotation={rotation}>
            <planeGeometry args={[4, 4]} />
            <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
        </mesh>
    );
}

function Room() {
    return (
        <>
            <Wall url="/assets/wall1.png" position={[0, 0, -2]} rotation={[0, 0, 0]} />
            <Wall url="/assets/wall2.png" position={[0, 0, 2]} rotation={[0, Math.PI, 0]} />
            <Wall url="/assets/wall3.png" position={[-2, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
            <Wall url="/assets/wall4.png" position={[2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
            <Wall url="/assets/wall5.png" position={[0, 1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
            <Wall url="/assets/wall5.png" position={[0, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]} />
        </>
    );
}

// AR Button Component with WebXR support
function ARButton({ onStartAR }) {
    const [isARSupported, setIsARSupported] = useState(false);

    useEffect(() => {
        // Check if WebXR AR is supported
        if (navigator.xr) {
            navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
                setIsARSupported(supported);
            });
        }
    }, []);

    if (!isARSupported) {
        return null; // Hide button if AR is not supported
    }

    return (
        <button 
            onClick={onStartAR}
            style={{
                position: 'absolute', 
                top: 20, 
                left: 20, 
                zIndex: 10,
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}
        >
            Enter AR
        </button>
    );
}

// WebXR AR Manager Hook
function useWebXR() {
    const { gl } = useThree();
    const [isARActive, setIsARActive] = useState(false);

    const startAR = async () => {
        if (!navigator.xr) {
            alert('WebXR is not supported on this device');
            return;
        }

        try {
            // Request AR session
            const session = await navigator.xr.requestSession('immersive-ar', {
                requiredFeatures: ['local'],
                optionalFeatures: ['hit-test', 'dom-overlay'],
                domOverlay: { root: document.body }
            });

            // Enable WebXR in the renderer
            await gl.xr.setSession(session);
            setIsARActive(true);

            // Handle session end
            session.addEventListener('end', () => {
                setIsARActive(false);
            });

        } catch (error) {
            console.error('Failed to start AR session:', error);
            alert('Failed to start AR. Make sure you are on a secure connection (HTTPS) and using a compatible device.');
        }
    };

    useEffect(() => {
        // Enable XR in the renderer
        gl.xr.enabled = true;
    }, [gl]);

    return { startAR, isARActive };
}

// AR Controls Component
function ARControls() {
    const { startAR, isARActive } = useWebXR();
    
    // Only render AR button outside of AR mode
    if (isARActive) return null;
    
    return <ARButton onStartAR={startAR} />;
}

// AR Room Component - optimized for AR viewing
function ARRoom() {
    const { gl } = useThree();
    const [isARActive, setIsARActive] = useState(false);
    
    useEffect(() => {
        const checkARState = () => {
            setIsARActive(gl.xr.isPresenting);
        };
        
        // Check AR state periodically
        const interval = setInterval(checkARState, 100);
        return () => clearInterval(interval);
    }, [gl]);
    
    if (!isARActive) {
        return <Room />; // Normal room when not in AR
    }
    
    // AR-optimized room with additional lighting
    return (
        <group scale={[0.1, 0.1, 0.1]} position={[0, -0.5, -1]}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[2, 2, 2]} intensity={0.8} />
            <Room />
        </group>
    );
}

export default function Shop() {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    
    return (
      <div className="w-screen h-screen">
        <Canvas 
            camera={{ position: [0, 0, 2], fov: 75 }} 
            className="w-screen h-screen"
            onCreated={({ gl }) => {
                // Enable WebXR support
                gl.xr.enabled = true;
            }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          {isMobile ? <OrbitControls enableZoom={false} /> : <Controls />}
          <ARRoom />
          <ARControls />
        </Canvas>
      </div>
    );
}
