import React, { Suspense, useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import * as THREE from "three";
import {
  Plane,
  KeyboardControls,
  PointerLockControls,
  OrbitControls,
  useTexture,
  Stars,
  useProgress,
  useGLTF,
} from "@react-three/drei";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  BallCollider,
  CylinderCollider,
  InstancedRigidBodies,
  useRapier,
} from "@react-three/rapier";
import Ecctrl, { EcctrlAnimation } from "ecctrl";
import { PlaneGeometry, RepeatWrapping, Vector3 } from "three";
import Loading from "./Loading";
import { Perf } from "r3f-perf";
import { useLoadingAssets, usePageVisible } from "../hook/inedx";

import Grass from "./Grass";
import { Character } from "./gltf/Character";
import RigidObjects from "./RigidObjects";
import { Forests } from "./gltf/Forests";

import Roles from "./Roles";
import OutsideBtns from "./OutsideBtns";

export default function PlayGround() {
  return (
    <>
      {/* 1.加载 */}
      {/* <Loading /> */}
      {/* 2.控制板 */}
      <Leva collapsed />
      {/* 3.Canvas */}
      <Canvas
        shadows
        camera={{
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
      // onPointerDown={(e) => {
      //   if (e.pointerType === "mouse") {
      //     e.target.requestPointerLock();
      //   }
      // }}
      >
        <Suspense fallback={<Loading />}>
          <WorldScene />
        </Suspense>
      </Canvas>

      {/* BTNs */}
      <OutsideBtns />
    </>
  );
}
export const WorldScene = () => {
  // 处理加载问题
  const loading = useLoadingAssets();
  const visible = usePageVisible();

  // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  const ref = useRef();
  const { physics, perfVisible } = useControls("Settings", {
    physics: false,
    perfVisible: true,
  });

  // MODE
  const { pointMode } = useControls({
    pointMode: false,
  });
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "run", keys: ["Shift"] },
    { name: "jump", keys: ["Space"] },
    { name: "action1", keys: ["1"] },
    { name: "action2", keys: ["2"] },
    { name: "action3", keys: ["3"] },
  ];
  const animationSet = {
    idle: "idle",
    walk: "walk",
    run: "run",
    jump: "jump",
    jumpIdle: "jump",
    jumpLand: "jump",
    fall: "idle", // This is for falling from high sky
    action1: "wave",
    action2: "dance",
    action3: "sitting",
  };
  const characterURL = "./models/character.glb";

  return (
    <>
      {perfVisible ? <Perf position="top-left" /> : null}

      <directionalLight
        intensity={1}
        color={"#FFFFED"}
        castShadow
        shadow-bias={-0.0004}
        position={[-20, 20, 20]}
        shadow-camera-top={20}
        shadow-camera-right={20}
        shadow-camera-bottom={-20}
        shadow-camera-left={-20}
      />
      <ambientLight intensity={0.2} />
      <hemisphereLight skyColor="blue" groundColor="#000" intensity={0.1} />
      {/* <Sky /> */}
      {/* <fog attach="fog" args={["#dbecfb", 5, 30]} /> */}
      {/* 实际控制视角 /////////////////////////////////////////////////////////// */}
      <Physics
        timeStep="vary"
        paused={!visible || loading}
        debug={physics}
        gravity={[0, -9.08, 0]}
      >
        <KeyboardControls map={keyboardMap}>
          <Ecctrl
            debug
            animated
            mode={pointMode ? "PointToMove" : ""}
            jumpVel={3}
            sprintMult={3}
            capsuleHalfHeight={0.4}
            name="character"
          >
            <EcctrlAnimation
              characterURL={characterURL}
              animationSet={animationSet}
            >
              <Character
                name="character"
                position={[0, -0.85, 0]}
                scale={0.005}
              />
            </EcctrlAnimation>
          </Ecctrl>
        </KeyboardControls>
        <Forests mode={pointMode} />
        <Roles />
        <RigidObjects />
        {/* <Grass position={[45, 0, 45]} scale={0.4} /> */}
        {/* <Grass position={[0, 0, 40]} scale={[1.45, 0.3, 0.6]} /> */}
        <Boundary />
      </Physics>
      {/* 实际控制视角 end /////////////////////////////////////////////////////////// */}

      {/* 位置渲染校验控制视角  /////////////////////////////////////////////////////////// */}

      {/* <PkcAnime /> 
          <ShutCube /> 
          <Grass /> 
          <Forest />
        <Charizard/>
        <Moltres />
        <Roles />

          <Player />
          */}
      {/*    <OrbitControls makeDefault autoRotate={false} />
     <Physics timeStep="vary" debug={physics} paused={!visible || loading}>
        <KeyboardControls map={keyboardMap}>
          <Ecctrl
            debug
            animated
            jumpVel={3}
            sprintMult={3}
            capsuleHalfHeight={0.45}
          >
            <EcctrlAnimation
              characterURL={characterURL}
              animationSet={animationSet}
            >
              <Character position={[0, -0.85, 0]} scale={0.005} />
            </EcctrlAnimation>
          </Ecctrl>
        </KeyboardControls>
        <Character position={[0, -0.85, 0]} scale={0.005} />
        <Roles />

        <Boundary />
        <Grass position={[0, 0, 40]} scale={[1.45,1,0.6]} />
        <RigidObjects />
        <Forests />
      </Physics> */}

      {/* 位置渲染校验控制视角  end  /////////////////////////////////////////////////////////// */}
    </>
  );
};
export const Sky = () => {
  // 方法1 创建球放全景图
  // const bgMap = useTexture("/textures/home_bg.png");
  // 方法2 引入glb 性能更好
  const sky = useGLTF("/models/sky.glb");
  return (
    // <mesh scale={100}>
    //   <sphereGeometry args={[5, 64, 64]} />
    //   <meshStandardMaterial map={bgMap} side={THREE.BackSide} />
    // </mesh>
    <mesh>
      <primitive object={sky.scene} />
    </mesh>
  );
};
// 射击
export const ShutCube = () => {
  const { camera } = useThree();
  const [cubeMesh, setCubeMesh] = useState([]);
  const cubeRef = useRef();

  const position = useMemo(() => new THREE.Vector3(), []);
  const direction = useMemo(() => new THREE.Vector3(), []);
  const clickToCreateBox = () => {
    if (document.pointerLockElement) {
      camera.parent.getWorldPosition(position);
      const newMesh = (
        <mesh
          position={[position.x, position.y - 0.5, position.z]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      );
      setCubeMesh((prevMeshes) => [...prevMeshes, newMesh]);
    }
  };
  useEffect(() => {
    camera.parent.getWorldDirection(direction);
    if (cubeMesh.length > 0) {
      cubeRef.current.setLinvel(
        new THREE.Vector3(
          direction.x * 20,
          direction.y * 20 + 2,
          direction.z * 20
        ),
        false
      );
    }
  }, [cubeMesh]);

  useEffect(() => {
    window.addEventListener("click", () => clickToCreateBox());

    return () => {
      window.removeEventListener("click", () => clickToCreateBox());
    };
  }, []);
  return (
    <>
      {cubeMesh.map((item, i) => {
        return (
          <RigidBody key={i} mass={0.6} ref={cubeRef}>
            {item}
          </RigidBody>
        );
      })}
    </>
  );
};
// 世界边界
export const Boundary = () => {
  const distance = 75;
  return (
    <>
      <RigidBody type="fixed">
        <CuboidCollider args={[distance, 1, 1]} position={[0, 1, distance]} />
        <CuboidCollider
          args={[1, 1, distance * 2]}
          position={[distance, 1, -distance]}
        />
        <CuboidCollider
          args={[distance, 1, 1]}
          position={[0, 1, -distance * 3]}
        />
        <CuboidCollider
          args={[1, 1, distance * 2]}
          position={[-distance, 1, -distance]}
        />
      </RigidBody>
    </>
  );
};
export const Ground = () => {
  const ref = useRef();
  const world_WH = 500;
  groundTexture.wrapS = RepeatWrapping;
  groundTexture.wrapT = RepeatWrapping;
  groundTexture.repeat.set(100, 100);
  return (
    // <RigidBody type="fixed" restitution={0} friction={0.7}>
    <RigidBody type="fixed" colliders="trimesh">
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[world_WH, world_WH]} />
        <meshStandardMaterial attach="material" map={groundTexture} />
      </mesh>
    </RigidBody>
  );
};
export const Player = () => {
  const { camera } = useThree();
  const ref = useRef();
  const pos = useRef([0, 0, 0]);
  useFrame(() => {
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2])
    );
  });
  // useEffect(() => {
  //   console.log(ref.current.position);
  //   pos.current = ref.current.position;
  // }, [ref.current?.position]);

  return (
    <>
      <RigidBody>
        <mesh ref={ref}>
          <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
          {/* <meshStandardMaterial attach="material" map={groundTexture} /> */}
        </mesh>
      </RigidBody>
    </>
  );
};
