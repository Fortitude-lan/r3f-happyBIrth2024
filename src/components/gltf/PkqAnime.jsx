/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 .\public\models\pkqAnime.glb -k 
*/

import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Button, Popover } from "antd";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
export function PkcAnime(props) {
  const group = useRef();
  const [isTouch, setisTouch] = useState(false);
  const { nodes, scene, materials, animations } = useGLTF(
    "/models/pkqAnime.glb"
  );
  const { actions } = useAnimations(animations, group);
  const pikaMP3 = new Audio("/sounds/pikachu.mp3");

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
  useEffect(() => {
    let action = actions["happy"];
    if (isTouch) {
      action = actions["PikachuAction"];
    } else {
      action = actions["happy"];
    }
    action.setEffectiveTimeScale(2);
    action.reset().fadeIn(0.5).play();
    return () => {
      action.fadeOut(0.5);
    };
  }, [isTouch]);

  return (
    <>
      <group
        ref={group}
        {...props}
        dispose={null}
        position={[40, 0, 40]}
        scale={1.5}
        rotation={[0, -Math.PI / 1.2, 0]}
      >
        <group name="Scene">
          <group name="Pikachu">
            <RigidBody
              colliders={false}
              type="fixed"
              name="皮卡丘"
              onCollisionEnter={({ manifold, target, other }) => {
                console.log(
                  "Collision at world position ",
                  manifold.solverContactPoint(0)
                );

                if (
                  other.rigidBodyObject &&
                  other.rigidBodyObject.name == "character"
                ) {
                  console.log(
                    target.rigidBodyObject.name,
                    " collided with ",
                    other.rigidBodyObject.name
                  );
                  setisTouch(true);
                }
              }}
              onCollisionExit={() => {
                console.log("皮卡丘离开了");
                setisTouch(false);
              }}
            >
              <primitive object={nodes.pm0025_00_pikachu} />
              <CapsuleCollider args={[0.5, 0.35]} />
              <Html
                position={[0, 1.5, 0]}
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
                      <p>MYK,终于等到你啦！</p>
                      <p>祝你生日快乐o(*￣▽￣*)ブ</p>
                      <p>
                        悄悄告诉你，骑士大人为你准备了
                        <em
                          style={{
                            fontStyle: "inherit",
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "#e55149",
                          }}
                        >
                          生日蛋糕
                        </em>
                        哦！
                      </p>
                      <p>快去找到那个充满惊喜的地方吧！</p>
                    </div>
                  }
                  title="Pikachu :"
                >
                  <Button type={`primary ${isTouch && "touch"}`}>
                    Hi! MYk
                  </Button>
                </Popover>
              </Html>
            </RigidBody>
            <group name="PikachuF001" onClick={(e) => pikaMP3.play()}>
              <skinnedMesh
                name="PikachuF002"
                geometry={nodes.PikachuF002.geometry}
                material={materials["Material #160.002"]}
                skeleton={nodes.PikachuF002.skeleton}
              />
              <skinnedMesh
                name="PikachuF002_1"
                geometry={nodes.PikachuF002_1.geometry}
                material={materials["Material #161.002"]}
                skeleton={nodes.PikachuF002_1.skeleton}
              />
              <skinnedMesh
                name="PikachuF002_2"
                geometry={nodes.PikachuF002_2.geometry}
                material={materials["Material #162.002"]}
                skeleton={nodes.PikachuF002_2.skeleton}
              />
              <skinnedMesh
                name="PikachuF002_3"
                geometry={nodes.PikachuF002_3.geometry}
                material={materials["Material #163.002"]}
                skeleton={nodes.PikachuF002_3.skeleton}
              />
            </group>
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/models/pkqAnime.glb");
