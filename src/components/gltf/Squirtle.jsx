/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 .\public\models\Squirtle.glb -k 
*/

import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { Button, Popover } from "antd";
import {
  CuboidCollider,
  CylinderCollider,
  RigidBody,
  InstancedRigidBodies,
  CapsuleCollider,
} from "@react-three/rapier";
export function Squirtle(props) {
  const { nodes, materials } = useGLTF("/models/Squirtle.glb");
  const group = useRef();
  const [isTouch, setisTouch] = useState(false);
  const audioRef = useRef(new Audio("/sounds/Squirtle.wav"));
  // 设置自发光材质S
  const emissionMaterial = (ref) => {
    ref.current.traverse((child) => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(setEmissive);
        } else {
          const m = child.material;
          m.emissive = m.color;
          m.emissiveMap = m.map;
          m.emissiveIntensity = 0.35;
        }
      }
    });
  };
  useEffect(() => {
    // 遍历模型中的每个材质并设置自发光
    if (group.current) emissionMaterial(group);
  }, []);
  return (
    <group {...props} ref={group} dispose={null}>
      <RigidBody
        name="杰尼龟"
        colliders={false}
        type="fixed"
        onCollisionEnter={({ manifold, target, other }) => {
          console.log(
            "Collision at world position ",
            manifold.solverContactPoint(0)
          );

          if (
            other.rigidBodyObject &&
            other.rigidBodyObject.name === "character"
          ) {
            console.log(
              target.rigidBodyObject.name,
              " collided with ",
              other.rigidBodyObject.name
            );
            audioRef.current.play();
            setisTouch(true);
          }
        }}
        onCollisionExit={() => {
          console.log("杰尼龟离开了");
          audioRef.current.pause();
          setisTouch(false);
        }}
      >
        <primitive object={nodes.pm0007_00} />
        <CapsuleCollider args={[0.1, 0.12]} />
        <Html
          position={[0, 0.3, 0]}
          wrapperClass="label"
          center
          distanceFactor={6}
          occlude={[group]}
        >
          <Popover
            trigger="hover"
            open={isTouch}
            content={
              <div>
                <p>MYK,你来啦！</p>
                <p>祝你生日快乐o(*￣▽￣*)ブ</p>
                <p>悄悄告诉你，我看到你身后的房子里面有一些东西</p>
                <p>我要在这里守着抓鱼吃，你替我去看看吧！</p>
              </div>
            }
            title="Squirtle :"
          >
            <Button type={`primary ${isTouch && "touch"}`}>Hi! MYk</Button>
          </Popover>
        </Html>
      </RigidBody>
      <skinnedMesh
        receiveShadow
        castShadow
        frustumCulled={false}
        name="Squirtle_1"
        geometry={nodes.Squirtle_1.geometry}
        material={materials["Material #60.001"]}
        skeleton={nodes.Squirtle_1.skeleton}
      />
      <skinnedMesh
        receiveShadow
        castShadow
        frustumCulled={false}
        name="Squirtle_2"
        geometry={nodes.Squirtle_2.geometry}
        material={materials["Material #61"]}
        skeleton={nodes.Squirtle_2.skeleton}
      />
    </group>
  );
}

useGLTF.preload("/models/Squirtle.glb");
