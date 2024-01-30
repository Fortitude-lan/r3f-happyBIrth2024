// World.js
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { World } from "../components/gltf/World";

const WorldScene = () => {
  const sceneRef = useRef();
  const { nodes: worldNodes } = useGLTF("/models/land.glb");
  console.log(worldNodes);
  // Load man model
  const { nodes: manNodes } = useGLTF("/models/pikachu.glb");

  // Camera reference for controlling rotation
  const cameraRef = useRef();

  // Keyboard event handler for controlling man's movement
  const handleKeyDown = (e) => {
    const speed = 0.1;
    const { key } = e;

    switch (key) {
      case "w":
        manNodes.character.position.z -= speed;
        break;
      // Add more controls if needed
      default:
        break;
    }
  };

  // Attach keyboard event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Canvas>
      {/* Perspective Camera */}
      <PerspectiveCamera
        ref={cameraRef}
        position={[0, 2, 5]}
        makeDefault // Make this the default camera
      />
      <ambientLight />
      {/* World Model */}
      <group ref={sceneRef}>
        {worldNodes && <primitive object={worldNodes} />}
      </group>

      {/* Man Model */}
      <group>{manNodes && <primitive object={manNodes} />}</group>

      {/* Orbit Controls for rotating the camera */}
      <OrbitControls
        enableDamping
        enableZoom={false}
        dampingFactor={0.25}
        rotateSpeed={0.35}
        args={[cameraRef.current, sceneRef.current]}
      />
    </Canvas>
  );
};

export default WorldScene;
