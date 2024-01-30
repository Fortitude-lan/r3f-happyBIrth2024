/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 .\public\models\Calem_anims.glb -k 
*/

import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import {
  CuboidCollider,
  CylinderCollider,
  RigidBody,
  InstancedRigidBodies,
  CapsuleCollider,
} from "@react-three/rapier";
export function Character2(props) {
  const group = useRef();
  const { nodes, scene, materials, animations } = useGLTF(
    "/models/Calem_anims.glb"
  );
  const audioRef = useRef(new Audio("/sounds/happyBD.m4a"));
  const [act, setact] = useState("wave");
  const [isTouch, setisTouch] = useState(false);
  const { actions } = useAnimations(animations, group);
  console.log("actions", actions);
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
    // actions["idle"].reset().fadeIn(0.5).play();
    let action = actions[act];
    action.setEffectiveTimeScale(2);

    if (isTouch) {
      action = actions["sing"];
      audioRef.current.play();
    } else {
      console.log("停止");
      audioRef.current.pause();
    }
    action.reset().fadeIn(0.5).play();
    return () => {
      action.fadeOut(0.5);
    };
  }, [isTouch, setisTouch]);
  return (
    <RigidBody
      name="nienie"
      colliders={false}
      type="fixed"
      position={[-26, 1, -175]}
      onCollisionEnter={({ manifold, target, other }) => {
        if (
          other.rigidBodyObject &&
          other.rigidBodyObject.name === "character"
        ) {
          console.log(
            "Collision at world position ",
            manifold.solverContactPoint(0)
          );
          console.log(
            target.rigidBodyObject.name,
            " collided with ",
            other.rigidBodyObject.name
          );
          setisTouch(true);
        }
      }}
      onCollisionExit={() => {
        console.log("离开了");
        setisTouch(false);
        setact("applause");
      }}
    >
      <group
        ref={group}
        {...props}
        dispose={null}
        // position={[45, 0, -177]}
        // rotation={[Math.PI / 2, 0, Math.PI / 8]}
        rotation={[Math.PI / 2, 0, -Math.PI / 8]}
        scale={0.0058}
      >
        <group name="Scene">
          <group name="Armature001">
            <primitive object={nodes.mixamorigHips} />

            <group name="Calem002">
              <skinnedMesh
                name="Calem003"
                geometry={nodes.Calem003.geometry}
                material={materials["Material #247.003"]}
                skeleton={nodes.Calem003.skeleton}
              />
              <skinnedMesh
                name="Calem003_1"
                geometry={nodes.Calem003_1.geometry}
                material={materials["Material #248.003"]}
                skeleton={nodes.Calem003_1.skeleton}
              />
              <skinnedMesh
                name="Calem003_2"
                geometry={nodes.Calem003_2.geometry}
                material={materials["Material #249.003"]}
                skeleton={nodes.Calem003_2.skeleton}
              />
              <skinnedMesh
                name="Calem003_3"
                geometry={nodes.Calem003_3.geometry}
                material={materials["Material #250.003"]}
                skeleton={nodes.Calem003_3.skeleton}
              />
              <skinnedMesh
                name="Calem003_4"
                geometry={nodes.Calem003_4.geometry}
                material={materials["Material #251.003"]}
                skeleton={nodes.Calem003_4.skeleton}
              />
              <skinnedMesh
                name="Calem003_5"
                geometry={nodes.Calem003_5.geometry}
                material={materials["Material #252.003"]}
                skeleton={nodes.Calem003_5.skeleton}
              />
              <skinnedMesh
                name="Calem003_6"
                geometry={nodes.Calem003_6.geometry}
                material={materials["Material #253.003"]}
                skeleton={nodes.Calem003_6.skeleton}
              />
              <skinnedMesh
                name="Calem003_7"
                geometry={nodes.Calem003_7.geometry}
                material={materials["Material #254.003"]}
                skeleton={nodes.Calem003_7.skeleton}
              />
              <skinnedMesh
                name="Calem003_8"
                geometry={nodes.Calem003_8.geometry}
                material={materials["Material #255.003"]}
                skeleton={nodes.Calem003_8.skeleton}
              />
              <skinnedMesh
                name="Calem003_9"
                geometry={nodes.Calem003_9.geometry}
                material={materials["Material #256.003"]}
                skeleton={nodes.Calem003_9.skeleton}
              />
            </group>
          </group>
        </group>
      </group>
      <CapsuleCollider args={[0.7, 0.6]} />
    </RigidBody>
  );
}

useGLTF.preload("/models/Calem_anims.glb");
