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
            <planeGeometry args={[4, 4]} /> {/* width=4, height=3 */}
            <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
        </mesh>
    );
}

function Room() {
    return (
        <>
            <Wall url="/src/assets/wall1.png" position={[0, 0, -2]} rotation={[0, 0, 0]} />           {/* back */}
            <Wall url="/src/assets/wall2.png" position={[0, 0, 2]} rotation={[0, Math.PI, 0]} />    {/* front */}
            <Wall url="/src/assets/wall3.png" position={[-2, 0, 0]} rotation={[0, Math.PI / 2, 0]} /> {/* left */}
            <Wall url="/src/assets/wall4.png" position={[2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} /> {/* right */}
            <Wall url="/src/assets/wall5.png" position={[0, 1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} /> {/* top */}
            <Wall url="/src/assets/wall5.png" position={[0, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]} /> {/* floor */}
        </>
    );
}


export default function Shop() {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    return (
        <div className="w-screen h-screen">
            <Canvas camera={{ position: [0, 0, 2], fov: 75 }} className="w-screen h-screen">
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} />

                {isMobile ? <MobileControl /> : <Controls />}

                {/* 6 sides: front, back, left, right, top, bottom */}
                <Room />
            </Canvas>
        </div>
    );
}
