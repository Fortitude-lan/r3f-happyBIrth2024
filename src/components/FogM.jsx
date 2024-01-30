import React, { useRef, useEffect, useState, forwardRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { extend, useFrame } from "@react-three/fiber";
import { Cloud, useGLTF, useAnimations, useTexture } from "@react-three/drei";

export const FogM = ({ ...props }) => {
  const group = useRef();
  // const cloud0 = useRef();
  // const cloud1 = useRef();
  const { color, x, y, z, range, ...config } = useControls("cloud", {
    seed: { value: 1, min: 1, max: 100, step: 1 },
    segments: { value: 20, min: 1, max: 80, step: 1 },
    volume: { value: 20, min: 0, max: 100, step: 0.1 },
    opacity: { value: 0.8, min: 0, max: 1, step: 0.01 },
    fade: { value: 10, min: 0, max: 400, step: 1 },
    growth: { value: 50, min: 0, max: 20, step: 1 },
    speed: { value: 0.1, min: 0, max: 1, step: 0.01 },
    x: { value: 0.5, min: 0, max: 100, step: 1 },
    y: { value: 0.5, min: 0, max: 100, step: 1 },
    z: { value: 3, min: 0, max: 100, step: 1 },
    color: "#8d00c7",
  });
  useFrame((state, delta) => {
    const tmp = Math.abs(Math.sin(state.clock.elapsedTime)) * 1;
    if (group.current) {
      // console.log(group);
      const cloud0 = group.current.children[0];
      const cloud1 = group.current.children[1];
      // console.log(cloud1);
      commonFUn(cloud0, 0.15, -10, tmp, delta);
      commonFUn(cloud1, 0.05, -2, tmp, delta);
    }
  });
  const commonFUn = (ref, upSpeed, end, tmp, delta) => {
    if (ref.position) {
      ref.scale.z -= delta * 1;
      ref.scale.x -= tmp * 0.005;
      ref.scale.y -= tmp * 0.005;
      ref.rotation.z -= delta;

      cloud1.current.scale.z -= delta * 2
      cloud1.current.scale.x -= tmp * 0.1
      cloud1.current.scale.y -= tmp * 0.1
      cloud1.current.rotation.z -= delta
      commonFUn(cloud1, 0)

      // 获取当前 Cloud 的位置
      const currentPosition = ref.position;
      // 向上移动 Cloud
      // const upSpeed = 0.05
      currentPosition.z -= upSpeed;
      // 如果超过一定高度，重置位置
      if (currentPosition.z < end) {
        currentPosition.z = 1;
      }
      if (ref.scale.x < 1) {
        ref.scale.x = 2;
      }
      if (ref.scale.y < 1) {
        ref.scale.y = 2;
      }
      if (ref.scale.z < -3 || ref.scale.z > 3) {
        ref.scale.z = 2;
      }
      // // 更新 Cloud 的位置
      ref.position.copy(currentPosition);
    }
  };
  return (
    <>
      <group {...props} scale={0.021} ref={group}>
        <Cloud {...config} bounds={[x, y, z]} color={color} />
        <Cloud {...config} bounds={[0.5,0.5,0.5]} color={color} />
      </group>
    </>
  );
};
