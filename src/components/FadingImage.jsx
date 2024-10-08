import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useTexture, shaderMaterial, RoundedBox } from "@react-three/drei";

export const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 1.2,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined,
  },
  ` varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
  ` varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float _rot;
    uniform float dispFactor;
    uniform float effectFactor;
    void main() {
      vec2 uv = vUv;
      vec4 disp = texture2D(disp, uv);
      vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
      vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
      vec4 _texture = texture2D(tex, distortedPosition);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);
      vec4 finalTexture = mix(_texture, _texture2, dispFactor);
      gl_FragColor = finalTexture;
      #include <tonemapping_fragment>
      #include <encodings_fragment>
    }`
);

extend({ ImageFadeMaterial });

export const FadingImage = ({ ...props }) => {
  const ref = useRef();
  const meshRef = useRef();
  const [texture1, texture2, dispTexture] = useTexture([
    "/textures/transparent.png",
    "/textures/world.png",
    "/textures/disFactor1.jpg",
  ]);
  const [hovered, setHover] = useState(false);
  useFrame(() => {
    ref.current.dispFactor = THREE.MathUtils.lerp(
      ref.current.dispFactor,
      hovered ? 1 : 0,
      0.075
    );
  });
  const { viewport } = useThree(); // 获取视口信息
  useEffect(() => {
    const { width, height } = viewport;
    // 设定模型在视口边缘的位置，这里以左下角为例
    if (meshRef.current) {
      meshRef.current.position.set(- width / 2 +1.5, -height / 2 +1, 0);
    }
  }, [viewport]);
  return (
    <mesh
      ref={meshRef}
      {...props}
      onPointerOver={(e) => {
        const canvasElement = document.querySelector("canvas"); // 替换成你的 Canvas 元素的 id
        if (canvasElement) {
          canvasElement.classList.remove("night");
        }
        setHover(true);
      }}
      onPointerOut={(e) => {
        const canvasElement = document.querySelector("canvas"); // 替换成你的 Canvas 元素的 id
        if (canvasElement) {
          canvasElement.classList.add("night");
        }
        setHover(false);
      }}
    >
      <circleGeometry args={[0.7]} />
      <imageFadeMaterial
        ref={ref}
        tex={texture1}
        tex2={texture2}
        disp={dispTexture}
        toneMapped={false}
      />
    </mesh>
  );
};
