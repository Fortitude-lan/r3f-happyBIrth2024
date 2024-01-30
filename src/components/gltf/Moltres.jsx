import React, { useRef, useEffect, useLayoutEffect } from "react";
import {
  useGLTF,
  useTexture,
  shaderMaterial,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";
import { extend, useFrame, useLoader } from "@react-three/fiber";

export default function Moltres(props) {
  const { nodes, scene, materials, animations } = useGLTF(
    "/models/moltres_anims.glb"
  );
  const group = useRef();
  const allRef = useRef();
  const aGeoRef = useRef();
  const cRef = useRef();
  const cGeoRef = useRef();
  const { actions } = useAnimations(animations, group);
  console.log(actions);
  const playAudio = () => {
    // 在这里放置播放音频的代码，例如使用<audio>元素或其他音频库
    const moltresMP3 = new Audio("/sounds/peacockscream.mp3");
    moltresMP3.play();
  };
  useEffect(() => {
    const action = actions["fly"];
    action.setEffectiveTimeScale(1.5);
    action.reset().fadeIn(0.5).play();
  }, []);
  useEffect(() => {
    // 在组件加载后，每隔5秒执行一次playAudio函数
    const intervalId = setInterval(playAudio, 10000);
    console.log("声音");
    // 组件卸载时清除定时器
    return () => clearInterval(intervalId);
  }, []);
  // 设置自发光材质
  const emissionMaterial = (ref) => {
    ref.current.traverse((child) => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(setEmissive);
        } else {
          const m = child.material;
          m.emissive = m.color;
          m.emissiveMap = m.map;
          m.emissiveIntensity = 0.25;
        }
      }
    });
  };
  useEffect(() => {
    // 遍历模型中的每个材质并设置自发光
    emissionMaterial(group);
  }, []);

  // 影响性能 画圈yundong
  // const positionVector = new THREE.Vector3();
  // const radius = 10;
  // const speedFactor = 0.15; // 速度
  // useFrame(({ clock }) => {
  // const elapsedTime = clock.getElapsedTime();
  // 让模型在 xz 平面上画圈
  // positionVector.set(
  //   Math.sin(elapsedTime * speedFactor) * radius,
  //   Math.sin(elapsedTime * speedFactor) * 2 + 0,
  //   Math.cos(elapsedTime * speedFactor) * radius - 50
  // );
  // positionVector.set(0, 0, 0);
  // group.current.position.copy(positionVector);

  // 计算鸟头朝向的角度，这取决于 xz 移动方向
  // const angle = Math.atan2(positionVector.x, positionVector.z) + Math.PI / 2;
  // 通过旋转模型的 y 轴来使模型的头朝向飞行方向
  // group.current.rotation.set(0, angle, 0);
  // });

  
  // useFrame((state, delta) => {
  //   if (cRef.current) {
  //     //层火焰闪烁
  //     const scaleSpeed = 0.01; // 调整这个值来改变速度
  //     const time = state.clock.elapsedTime;
  //     const randomS = 0.5 + Math.random() * 0.5;
  //     const scaleFactor = randomS + Math.sin(time) * 0.00001; // 根据需要调整
  //     // cGeoRef.current.scale.x = scaleFactor;
  //     // cGeoRef.current.scale.y = scaleFactor;
  //     // console.log(scaleFactor);
  //     // console.log(cRef.current.uniforms.uTime.value);
  //     return (cRef.current.uniforms.uTime.value += time * scaleSpeed);
  //   }
  // });
  // useFrame((state, delta) => {
  //   if (allRef.current) {
  //     const time = state.clock.elapsedTime;
  //     const randomS = 0.7 + Math.random() * 0.5;
  //     const scaleFactor = randomS + Math.sin(time) * 0.1; // 根据需要调整
  //     //   bRef.current.scale.x = scaleFactor;
  //     //   bRef.current.scale.y = scaleFactor;
  //     return (allRef.current.uniforms.uTime.value += delta * 2);
  //   }
  // });
  // const alphaMapTexture1 = useTexture("/textures/pm0146_00_FireCoreBC2.png");
  // const alphaMapTexture2 = useTexture("/textures/pm0146_00_FireStenABC1.png");
  // const alphaMapTexture3 = useTexture("/textures/pm0146_00_FireCoreBC1.png");

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      position={[0, 30, -55]}
      scale={0.5}
    >
      <group name="Scene">
        <group name="Armature" scale={2}>
          <primitive object={nodes.pm0146_00} />
          <group name="Moltres">
            <skinnedMesh
              name="Moltres_1"
              geometry={nodes.Moltres_1.geometry}
              material={materials["Material #10"]}
              skeleton={nodes.Moltres_1.skeleton}
            />
            <skinnedMesh
              name="Moltres_2"
              geometry={nodes.Moltres_2.geometry}
              material={materials["Material #11"]}
              skeleton={nodes.Moltres_2.skeleton}
            />
          </group>
        </group>
        {/* <group scale={0.35} position-z={-0.2}>
          <skinnedMesh
            name="Moltres_3"
            geometry={nodes.Moltres_3.geometry}
            material={materials["Material #12"]}
            skeleton={nodes.Moltres_3.skeleton}
            ref={aGeoRef}
          >
            <tailCMaterial
              ref={allRef}
              uAlphaMap={alphaMapTexture2}
              side={THREE.DoubleSide}
            />
          </skinnedMesh>
          <skinnedMesh
            name="Moltres_4"
            geometry={nodes.Moltres_4.geometry}
            material={materials["Material #13"]}
            skeleton={nodes.Moltres_4.skeleton}
            ref={aGeoRef}
          >
            <tailCMaterial
              ref={allRef}
              uAlphaMap={alphaMapTexture2}
              side={THREE.DoubleSide}
            />
          </skinnedMesh>
        </group>
        <group scale={0.35}  position-z={-0.1}>
          <skinnedMesh
            name="Moltres_5"
            geometry={nodes.Moltres_5.geometry}
            material={materials["Material #14"]}
            skeleton={nodes.Moltres_5.skeleton}
            ref={cGeoRef}
          >
            <tailSMaterial
              ref={cRef}
              uAlphaMap={alphaMapTexture3}
              side={THREE.DoubleSide}
            />
          </skinnedMesh>
        </group> */}
      </group>
    </group>
  );
}
useGLTF.preload("/models/moltres_anims.glb");

export const TailSMaterial = shaderMaterial(
  {
    uTime: 0.0,
    uColor: new THREE.Color(1, 0.5, 0.0),
    uAlphaMap: null,
  },
  // vertex shader
  /*glsl*/ `
    uniform float uTime;
    varying vec2 vUv;
  
    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
      // 根据 y 高度调整 sin 波动的幅度
      float frequency = 200.0 + modelPosition.y * 1.0; // 调整频率
      float amplitude = 0.04 + modelPosition.y * 0.05;   // 调整振幅
      // 使用sin函数来修改X和Z轴的位置
      float heightFactor = modelPosition.y / 10.0; // 通过适当的缩放调整范围
      float sinFrequency = mix(20.0, 50.0, heightFactor);
  
      modelPosition.x += sin(modelPosition.y* sinFrequency + uTime*10.0) * 0.01;
      modelPosition.z += sin(modelPosition.y* sinFrequency + uTime*10.0) * 0.01;
      // modelPosition.x += sin(modelPosition.y * frequency * 20.0 + uTime * 10.0) * amplitude;
      // modelPosition.z += sin(modelPosition.y * frequency * 20.0 + uTime * 10.0) * amplitude;
      // modelPosition.y +=1.0;
       
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPosition = projectionMatrix * viewPosition;
      gl_Position = projectionPosition;
      vUv = uv;
    }
    `,
  // fragment shader
  /*glsl*/ `
    uniform float uTime;
    uniform vec3 uColor;
    uniform sampler2D uAlphaMap;
    varying vec2 vUv;
  
    void main() {
       // Sample the alpha map
       vec3 alphaColor = texture2D(uAlphaMap, vUv).rgb;
  
       // Set a threshold to determine where black becomes transparent
       float threshold = 0.25; // You may need to adjust this value
   
       // If the alphaColor is close to black, discard the pixel (make it transparent) , length() is light strengthen
       if (length(alphaColor) < threshold) {
           discard;
       }
  
      // 在这里根据 position.y 和 uTime 设置 alpha 值
      float alpha = 0.8 + 0.5 * sin(vUv.y * 10.0 + uTime * 2.0);
  
      gl_FragColor = vec4(uColor, alpha);
       // Output the final color (non-transparent part)
        //  gl_FragColor.rgb += yWave;
    }
    `
);
export const TailCMaterial = shaderMaterial(
  {
    uTime: 0.0,
    uColor: new THREE.Color(1, 0.5, 0.0),
    uGradientColor: new THREE.Color(1, 0, 0),
    uAlphaMap: null,
  },
  // vertex shader
  /*glsl*/ `
    uniform float uTime;
    varying vec2 vUv;
  
    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
      // 根据 y 高度调整 sin 波动的幅度
      float frequency = 200.0 + modelPosition.y * 1.0; // 调整频率
      float amplitude = 0.04 + modelPosition.y * 0.05;   // 调整振幅
      // 使用sin函数来修改X和Z轴的位置
      float heightFactor = modelPosition.y / 10.0; // 通过适当的缩放调整范围
      float sinFrequency = mix(20.0, 50.0, heightFactor);
  
      // modelPosition.x += -sin(modelPosition.y* sinFrequency + uTime*10.0) * 0.01;
      // modelPosition.z += -sin(modelPosition.y* sinFrequency + uTime*10.0) * 0.01;
      modelPosition.x += sin(modelPosition.y * frequency * 20.0 + uTime * 10.0) * amplitude;
      modelPosition.z += sin(modelPosition.y * frequency * 20.0 + uTime * 10.0) * amplitude;
  
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPosition = projectionMatrix * viewPosition;
      gl_Position = projectionPosition;
      vUv = uv;
    }
    `,
  // fragment shader
  /*glsl*/ `
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uGradientColor;
    uniform sampler2D uAlphaMap;
    varying vec2 vUv;
  
    void main() {
       // Sample the alpha map
       vec3 alphaColor = texture2D(uAlphaMap, vUv).rgb;
  
       // Set a threshold to determine where black becomes transparent
       float threshold = 0.1; // You may need to adjust this value
   
       // Define the color for the non-transparent part (orange)
       vec3 nonTransparentColor = mix(uColor, uGradientColor, vUv.y);;
       
       // If the alphaColor is close to black, discard the pixel (make it transparent) , length() is light strengthen
       if (length(alphaColor) < threshold) {
           discard;
       }
  
       // Output the final color (non-transparent part)
       gl_FragColor = vec4(nonTransparentColor, 1.0);
     
    }
    `
);
extend({ TailCMaterial, TailSMaterial });
