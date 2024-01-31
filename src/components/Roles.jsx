import React, { useEffect, useRef, useState } from "react";
import { extend, useFrame, useLoader } from "@react-three/fiber";

import { useGLTF, useAnimations } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  CylinderCollider,
  RigidBody,
  CapsuleCollider,
} from "@react-three/rapier";

import Moltres from "./gltf/Moltres";
import { Charizard } from "./gltf/Charizard";
import { PkcAnime } from "./gltf/PkqAnime";
import { SlowPoke } from "./gltf/SlowPoke";
import { Ivysaur } from "./gltf/Ivysaur";
import { Squirtle } from "./gltf/Squirtle";
import { Snorlax } from "./gltf/Snorlax";
import { Character2 } from "./gltf/Character2";
import { PokemonsInHouse } from "./gltf/PokemonsInHouse";

export default function Roles(props) {
  return (
    <>
      {/* 喷火龙 */}
      <Charizard position={[-50, 3, 0]} scale={2} />
      {/* 皮卡丘 */}
      <PkcAnime
        position={[40, 0, 40]}
        scale={1.5}
        rotation={[0, -Math.PI / 1.2, 0]}
      />
      {/* 杰尼龟 */}
      <Squirtle position={[-45.2, 0.55, -21.8]} scale={7} />

      {/* 呆呆兽 */}
      <SlowPoke position={[10, 2.2, -55]} scale={3} />
      {/* 火焰鸟 */}
      {/* <Moltres /> */}
      {/* 大肚兽 */}
      <Snorlax
        position={[27, 12, -125]}
        rotation={[Math.PI / 2, -Math.PI / 2, Math.PI / 2]}
        scale={2}
      />
      {/* 妙蛙种子 */}
      <Ivysaur position={[-11, 0.2, -212]} scale={8} />
      {/* 小姐姐 */}
      <Character2 position-y={-1} />
      {/* 屋子里的宝可梦 */}
      <PokemonsInHouse />
    </>
  );
}
useGLTF.preload("/models/pokemons_anims.glb");
