/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 .\public\models\Snorlax.glb -k 
*/

import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  CylinderCollider,
  RigidBody,
  InstancedRigidBodies,
  CapsuleCollider,
} from "@react-three/rapier";
export function Snorlax(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/Snorlax_anims.glb");
  const { actions } = useAnimations(animations, group);
  console.log(actions);
  // 设置自发光材质
  const emissionMaterial = (ref) => {
    if (ref.current) {
      ref.current.traverse((child) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(setEmissive);
          } else {
            const m = child.material;
            m.emissive = m.color;
            m.emissiveMap = m.map;
            m.emissiveIntensity = 0.5;
          }
        }
      });
    }
  };
  useEffect(() => {
    // 遍历模型中的每个材质并设置自发光
    emissionMaterial(group);
  }, []);

  useEffect(() => {
    actions["lay"].reset().fadeIn(0.5).play();
  }, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Snorlax">
          {/* <RigidBody
            colliders={false}
            type="fixed"
            onCollisionEnter={() => {
              console.log("大胖碰到了");
            }}
            onCollisionExit={() => {
              console.log("大胖离开了");
            }}
          > */}
          <primitive object={nodes.gamemodel} />
          <primitive object={nodes.Top} />
          {/* <CapsuleCollider args={[0.1, 0.8]} />
          </RigidBody> */}
          <skinnedMesh
            name="Snorlax001"
            geometry={nodes.Snorlax001.geometry}
            material={materials["ShaderfxShader2.004"]}
            skeleton={nodes.Snorlax001.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Snorlax_anims.glb");
