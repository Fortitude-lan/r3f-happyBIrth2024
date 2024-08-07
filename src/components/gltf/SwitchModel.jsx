import React, { useState, useEffect, useRef } from "react";
import { useGLTF, useTexture, meshBounds } from "@react-three/drei";
import { a } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
export default function SwitchModel({
  contextHolder1,
  toggle,
  x,
  set,
  m1,
  m2,
}) {
  const { nodes, materials } = useGLTF("/models/pingpang.glb");
  const switchMP3 = new Audio("/sounds/click.mp3");
  const texture1 = useTexture("/textures/pikaBall.png");
  const texture2 = useTexture("/textures/pikaBall1.png");
  const switchRef = useRef();
  // const { camera } = useThree();
  // useEffect(() => {
  //   // const cameraDistance = Math.sqrt(camera.position.x + camera.position.y);
  //   // 计算相机的 xy 距离与浏览器可视区域的比例值
  //   const distanceRatioX = camera.position.z / window.innerWidth;
  //   const distanceRatioY = camera.position.z / window.innerHeight;
  //   const modelWorldPosition = switchRef.current.position.project(camera);
  //   const x = ((modelWorldPosition.x + 1) * window.innerWidth) / 2;
  //   const y = ((-modelWorldPosition.y + 1) * window.innerHeight) / 2;
  //   console.log(x, y, "distanceRatioY");
  //   // switchRef.current.position.x = x;
  //   // switchRef.current.position.y = distanceRatioX / 2;
  // }, []);

  // Hover state
  const [hovered, setHover] = useState(false);
  useEffect(
    () => void (document.body.style.cursor = hovered ? "pointer" : "auto"),
    [hovered]
  );
  // Events
  const onClick = () => {
    set((toggle) => {
      let currentState = !toggle;
      !currentState ? m1() : m2();
      console.log(currentState);
      const canvasElement = document.querySelector("canvas"); // 替换成你的 Canvas 元素的 id
      if (canvasElement) {
        if (currentState) {
          canvasElement.classList.add("night");
        } else {
          canvasElement.classList.remove("night");
        }
      }
      return Number(!toggle);
    });
    switchMP3.play();
    setTimeout(() => {
      switchMP3.pause();
    }, 500);
  };
  const onPointerOver = () => setHover(true);
  const onPointerOut = () => setHover(false);
  // Interpolations
  const pZ = x.to([0, 1], [-1.2, 1.5]);
  const rX = x.to([0, 1], [0, Math.PI * 2.1]);
  const color = x.to([0, 1], ["#888", "#3a3a3a"]);
  useFrame(({ camera }) => {
    // switchRef.current.position.x = -camera.position.z * 0.64;
    // switchRef.current.position.y = camera.position.z * 0.3;
  });

  return (
    <>
      <group
        ref={switchRef}
        position={[-2.8, 1.5, 0]}
        scale={0.08}
        dispose={null}
        rotation={[Math.PI / 2, Math.PI / 2, 0]}
      >
        <a.group>
          {toggle ? (
            <a.pointLight
              intensity={33}
              distance={0.5}
              position={[0, 2.5, 2.5]}
              color={color}
            />
          ) : null}
          <a.mesh
            receiveShadow
            castShadow
            material={materials.track}
            geometry={nodes.Cube.geometry}
            material-color={color}
            material-roughness={0.5}
            material-metalness={0.8}
          />
        </a.group>
        <a.group position-y={0.4} position-z={pZ} rotation={[0, 0, 2]}>
          <a.mesh
            receiveShadow
            castShadow
            raycast={meshBounds}
            rotation-x={rX}
            onPointerUp={onClick}
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
          >
            <sphereGeometry args={[0.8, 64, 64]} />
            <a.meshStandardMaterial
              roughness={0.5}
              map={toggle === 0 ? texture1 : texture2}
            />
          </a.mesh>
          <a.pointLight intensity={100} distance={1.4} color={color} />
        </a.group>
      </group>
    </>
  );
}
