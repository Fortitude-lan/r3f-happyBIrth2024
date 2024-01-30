import { Text, Float, Text3D, useTexture } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  CylinderCollider,
  RigidBody,
  InstancedRigidBodies,
} from "@react-three/rapier";
import React, { Suspense, useState, useEffect, useRef, useMemo } from "react";
import { MathUtils } from "three";
import { Chochlate } from "./gltf/Chocolate";
import { Foods } from "./gltf/Foods";
export default function RigidObjects() {
  const texture1 = useTexture("/textures/pikaBall.png");
  const cubesCount = 30;
  const cubesRef = useRef();
  const sphereRef = useRef();
  const instances = useMemo(() => {
    const instances = [];
    for (let i = 0; i < cubesCount; i++) {
      instances.push({
        key: "instance_" + Math.random(),
        position: [Math.random() * 30 + 30, 1.5, Math.random() * 30 + 30],
        rotation: [Math.random(), Math.random(), Math.random()],
        // scale: 0.3 + Math.random() * 0.8,
        scale: 0.25,
      });
    }
    return instances;
  }, []);
  const cubeJump = (ref) => {
    console.log("Jump: applyImpulse(vec3)");
    console.log("扭矩: applyTorqueImpulse(vec3) ");
    const mass = ref.current.mass();
    console.log(mass);
    ref.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 }, true);
    ref.current.applyTorqueImpulse(
      {
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
        z: Math.random() - 0.5,
      },
      true
    );
  };
  return (
    <>
      {/* Rigid body boxes */}
      {/* <RigidBody position={[15, 1, 2]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color={"lightsteelblue"} />
        </mesh>
      </RigidBody>
      <RigidBody position={[15.1, 0, 2]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color={"lightsteelblue"} />
        </mesh>
      </RigidBody> */}
      {/* <Float speed={2} rotationIntensity={0.5} floatIntensity={0.1}> */}
      <Text3D
        scale={10}
        color="salmon"
        //   font="/typefaces/rubik-bubbles-v3-latin-regular.woff"
        font="/typefaces/Rubik Bubbles_Regular.json"
        position={[20, 20, 60]}
        //   maxWidth={10}
        //   textAlign="center"
        rotation={[0, Math.PI, 0]}
        size={0.5}
        height={0.1}
      >
        Happy Birthday
        <meshStandardMaterial color="salmon" />
      </Text3D>
      {/* </Float> */}
      {/* <RigidBody position={[20, 5, 0]} colliders={false}>
        <Text3D
          size={0.5}
          height={0.2}
          position={[-1, 1, 3]}
          letterSpacing={0.1}
          font="/typefaces/optimer_bold.typeface.json"
        >
          Text 3D
          <meshStandardMaterial color="aqua" />
        </Text3D>
        <Text
          scale={0.5}
          color="black"
          maxWidth={10}
          textAlign="center"
          position={[0, 1, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          SDSDS
        </Text>
      </RigidBody> */}
      {/* <RigidBody ref={sphereRef} position={[2, 5, 0]} colliders={false}>
        <BallCollider args={[0.3]} />
        <mesh receiveShadow castShadow onClick={() => cubeJump(sphereRef)}>
          <sphereGeometry args={[0.3, 16, 32]} />
          <meshStandardMaterial color={"lightsteelblue"} map={texture1} />
        </mesh>
      </RigidBody> */}

      <InstancedRigidBodies instances={instances} colliders="ball" mass={0.001}>
        <instancedMesh
          receiveShadow
          castShadow
          ref={cubesRef}
          args={[null, null, cubesCount]}
          frustumCulled={false}
        >
          <sphereGeometry />
          <meshStandardMaterial map={texture1} />
        </instancedMesh>
      </InstancedRigidBodies>
      <Chochlate />
      <Foods />
    </>
  );
}
