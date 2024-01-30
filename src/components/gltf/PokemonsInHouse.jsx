/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 .\public\models\Piplup.glb -k 
*/

import React, { Suspense, useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
export function PokemonsInHouse(props) {
  const group = useRef();
  const { nodes, scene, materials } = useGLTF("/models/pokes.glb");
  // // 设置自发光材质
  // const emissionMaterial = (ref) => {
  //   ref.current.traverse((child) => {
  //     if (child.isMesh && child.material) {
  //       if (Array.isArray(child.material)) {
  //         child.material.forEach(setEmissive);
  //       } else {
  //         const m = child.material;
  //         m.emissive = m.color;
  //         m.emissiveMap = m.map;
  //         m.emissiveIntensity = 0.25;
  //       }
  //     }
  //   });
  // };
  // useEffect(() => {
  //   // 遍历模型中的每个材质并设置自发光
  //   if (group.current) emissionMaterial(group);
  // }, []);
  return (
    <group
      {...props}
      dispose={null}
      rotation={[0, -Math.PI / 4, 0]}
      position={[48, 1, -185]}
      scale={5}
    >
      <primitive object={nodes.pm0132_00} />
      <skinnedMesh
        name="mesh_0_pm0132_00_Skin_001"
        geometry={nodes.mesh_0_pm0132_00_Skin_001.geometry}
        material={materials["BodySpc-material"]}
        skeleton={nodes.mesh_0_pm0132_00_Skin_001.skeleton}
      />
      <skinnedMesh
        name="mesh_1_pm0132_00_Skin_001"
        geometry={nodes.mesh_1_pm0132_00_Skin_001.geometry}
        material={materials["Eye-material"]}
        skeleton={nodes.mesh_1_pm0132_00_Skin_001.skeleton}
      />
      <skinnedMesh
        name="mesh_2_pm0132_00_Skin_001"
        geometry={nodes.mesh_2_pm0132_00_Skin_001.geometry}
        material={materials["Mouth-material"]}
        skeleton={nodes.mesh_2_pm0132_00_Skin_001.skeleton}
      />
      <primitive object={nodes.pm0255_00_achamo} />
      <skinnedMesh
        name="TorchicF_MouthClosed"
        geometry={nodes.TorchicF_MouthClosed.geometry}
        material={materials["Material #93"]}
        skeleton={nodes.TorchicF_MouthClosed.skeleton}
      />
      <skinnedMesh
        name="TorchicF_MouthOpen"
        geometry={nodes.TorchicF_MouthOpen.geometry}
        material={materials["Material #93"]}
        skeleton={nodes.TorchicF_MouthOpen.skeleton}
      />
      <skinnedMesh
        name="TorchicF_1"
        geometry={nodes.TorchicF_1.geometry}
        material={materials["Material #93"]}
        skeleton={nodes.TorchicF_1.skeleton}
      />
      <skinnedMesh
        name="TorchicF_2"
        geometry={nodes.TorchicF_2.geometry}
        material={materials["Material #94"]}
        skeleton={nodes.TorchicF_2.skeleton}
      />
      <primitive object={nodes.pm0094_00} />
      <skinnedMesh
        name="Gengar_Mask"
        geometry={nodes.Gengar_Mask.geometry}
        material={materials["Material #10.001"]}
        skeleton={nodes.Gengar_Mask.skeleton}
      />
      <skinnedMesh
        name="Gengar_TongueA"
        geometry={nodes.Gengar_TongueA.geometry}
        material={materials["Material #10.001"]}
        skeleton={nodes.Gengar_TongueA.skeleton}
      />
      <skinnedMesh
        name="Gengar_TongueB_1"
        geometry={nodes.Gengar_TongueB_1.geometry}
        material={materials["Material #10.001"]}
        skeleton={nodes.Gengar_TongueB_1.skeleton}
      />
      <skinnedMesh
        name="Gengar_TongueB_2"
        geometry={nodes.Gengar_TongueB_2.geometry}
        material={materials["Material #11.001"]}
        skeleton={nodes.Gengar_TongueB_2.skeleton}
      />
      <primitive object={nodes.pm0723_00} />
      <skinnedMesh
        name="Froakie_FoamA"
        geometry={nodes.Froakie_FoamA.geometry}
        material={materials["Material #12"]}
        skeleton={nodes.Froakie_FoamA.skeleton}
      />
      <skinnedMesh
        name="Froakie_FoamB"
        geometry={nodes.Froakie_FoamB.geometry}
        material={materials["Material #12"]}
        skeleton={nodes.Froakie_FoamB.skeleton}
      />
      <skinnedMesh
        name="Froakie_1"
        geometry={nodes.Froakie_1.geometry}
        material={materials["Material #12"]}
        skeleton={nodes.Froakie_1.skeleton}
      />
      <skinnedMesh
        name="Froakie_2"
        geometry={nodes.Froakie_2.geometry}
        material={materials["Material #11"]}
        skeleton={nodes.Froakie_2.skeleton}
      />
      <skinnedMesh
        name="Froakie_3"
        geometry={nodes.Froakie_3.geometry}
        material={materials["Material #10"]}
        skeleton={nodes.Froakie_3.skeleton}
      />
      <skinnedMesh
        name="Froakie_4"
        geometry={nodes.Froakie_4.geometry}
        material={materials["Material #13"]}
        skeleton={nodes.Froakie_4.skeleton}
      />
    </group>
  );
}

useGLTF.preload("/models/pokes.glb");
