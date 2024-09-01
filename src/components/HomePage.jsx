import {
  Suspense,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  forwardRef,
} from "react";
import { useControls } from "leva";
import * as THREE from "three";
import {
  OrbitControls,
  Html,
  Environment,
  Text3D,
  Text,
  Center,
  useTexture,
  MeshPortalMaterial,
  Edges,
  RoundedBox,
  useGLTF,
  TransformControls,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";
import { useNavigate } from "react-router-dom";

import { HeartFilled, HomeFilled } from "@ant-design/icons";
import { message } from "antd";
import { easing } from "maath";

import { Pikachu } from "./gltf/Pikachu";
import SwitchModel from "./gltf/SwitchModel";
import { Gastly } from "./gltf/Gastly";
import { FogM } from "./FogM";
import { FadingImage } from "./FadingImage";
// import Fog from "./Fog";

export default function HomePage() {

  const [messageApi, contextHolder] = message.useMessage();
  const [messageApi1, contextHolder1] = message.useMessage();
  const navigate = useNavigate();

  const { maxAzimuthAngle, minAzimuthAngle } = useControls("Control", {
    maxAzimuthAngle: {
      value: 0,
      min: -2 * Math.PI,
      max: 2 * Math.PI,
      step: 0.01,
    },
    minAzimuthAngle: {
      value: -0,
      min: -2 * Math.PI,
      max: 2 * Math.PI,
      step: 0.01,
    },
  });

  const [toggle, setToggle] = useState(0);
  const [{ x }] = useSpring(
    {
      x: toggle,
      config: { mass: 5, tension: 1000, friction: 50, precision: 0.0001 },
    },
    [toggle]
  );

  console.log("开关：", toggle);

  useEffect(() => {
    console.log("欢迎来到宝可梦世界！！！");
    m1();
  }, []);
  const m1 = () => {
    messageApi.open({
      // type: "success",
      icon: (
        <HeartFilled
          style={{
            color: "#ff1d1d",
          }}
        />
      ),
      content: `点一点有惊喜哦 !`,
      // duration: 300,
    });
  };
  const m2 = () => {
    messageApi1.open({
      // type: "success",
      icon: (
        <HomeFilled
          style={{
            color: "#851dff",
          }}
        />
      ),
      content: `Find the Entry`,
      // duration: 300,
    });
  };

  return (
    <>
      {/* <ambientLight intensity={1} color="#fff" /> */}

      {/* 模型依赖环境光 */}
      {!toggle ? (
        <Environment preset={null} files={"/textures/venice_sunset_1k.hdr"} />
      ) : null}

      <OrbitControls
        enableZoom={false} //禁止缩放
        enablePan={false} //禁止平移
        // enableRotate={false} //禁止旋转
        maxAzimuthAngle={maxAzimuthAngle} //水平旋转的角度上限
        minAzimuthAngle={minAzimuthAngle} //水平旋转的角度上限
        maxPolarAngle={Math.PI / 2} //{Math.PI / 1.7} //{Math.PI / 1.2} //垂直旋转的角度上限
        minPolarAngle={Math.PI / 2} //{Math.PI / 2.5} //{Math.PI / 4} //垂直旋转的角度下限
        dampingFactor={0.25} // 可根据需要调整阻尼因子
      />

      <Suspense fallback={null}>

        {/* 背景 */}
        <PanoramaSphere />

        {/* 皮卡丘 */}
        {!toggle && <Pikachu scale={1.2} position={[1.27, -1.05, 0]} />}
        {/* 鬼 */}
        {toggle && <Gastly position={[-0.8, 0.7, 0]} scale={1.1} />}
        {/* <Suspense fallback={null}>
          <Gastly position={[-0.64, 0.7, 0]} scale={1.1} />
          <FogM position={[-0.3, 0.35, 0]} />
        </Suspense> */}

        {/* 文字 */}
        <HomeTitle toggle={toggle} />


        {/* Switch 开关*/}
        <SwitchModel
          x={x}
          set={setToggle}
          toggle={toggle}
          contextHolder1={contextHolder}
          m1={m1}
          m2={m2}
        />
        {/* 入口 水波显示图片 */}
        {toggle && (
          <FadingImage
            scale={0.5}
            // position={[3.5, -1.5, 0]}
            onClick={() => {
              const switchMP3 = new Audio("/sounds/click.mp3");
              switchMP3.play();
              setTimeout(() => {
                switchMP3.pause();
                navigate("/playground");
              }, 1000);
            }}
          />
        )}

        {/* <DreamGate /> */}
        {/* {toggle && <Box position={[0, 0, 0]} scale={0.15} toggle={toggle}/>} */}



        {/* message */}
        <Html>{contextHolder}</Html>
        <Html>{contextHolder1}</Html>
      </Suspense >
    </>
  );
};
export const HomeTitle = ({ toggle, ...props }) => {
  const textRef = useRef();
  const { tsize, height, letterSpacing } = useControls({
    tsize: { value: 0.6, min: 0, max: 1, step: 0.01 },
    height: { value: 0.025, min: 0, max: 1, step: 0.01 },
    letterSpacing: { value: 0.03, min: -0.1, max: 0.2, step: 0.01 },
  });
  // 在这里设置初始比率： 浏览器宽度- texted size
  // let initialSize = 0.31;
  // const ratio = (initialSize / (1130 / size.width)).toFixed(2);
  // useFrame(() => {
  //   // 获取当前浏览器宽度
  //   console.log(textRef.current.size);
  //   // 更新3D文本的size
  //   textRef.current.size = ratio;
  //   sets(ratio)
  // });

  return (
    <mesh>
      <Center>
        <Text3D
          ref={textRef}
          height={height}
          letterSpacing={0.02}
          // size={s}
          size={0.8}
          // size={fontsize}
          position={[0, -0.5, 0]}
          font="/typefaces/Rubik Bubbles_Regular.json"
        >
          {toggle ? `Welc   me to\nPokémo Land` : `Welcome to\nPokémo   and`}
          <meshBasicMaterial color={toggle ? "Indigo" : "SandyBrown"} />
        </Text3D>
        <Text3D
          ref={textRef}
          height={height}
          letterSpacing={letterSpacing}
          // size={s}
          // size={tsize}
          size={0.75}
          position={[0.2, -0.5, 0]}
          font="/typefaces/Rubik Bubbles_Regular.json"
        >
          {toggle ? `Welc   me to\nPokémo Land` : `Welcome to\nPokémo   and`}
          <meshBasicMaterial color={toggle ? "MediumPurple" : "Gold"} />
        </Text3D>
      </Center>
    </mesh>
  );
};

// 全景背景 sphere 贴图
export const PanoramaSphere = () => {
  const bgMap = useTexture("/textures/home_bg.png");
  const bgRef = useRef();
  // 每帧旋转球体
  useFrame(() => {
    if (bgRef.current) {
      bgRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={bgRef}>
      <sphereGeometry args={[10, 32, 32]} />
      <meshStandardMaterial side={THREE.BackSide} map={bgMap} />
    </mesh>
  );
};
;
