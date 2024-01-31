import React, { useEffect, useState, useRef } from "react";
import Icon, {
  CommentOutlined,
  CustomerServiceOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { FloatButton, Popover } from "antd";

import StarSvg from "../assets/star.svg?react";
import KeyControlImg from "../assets/keyControls.png";
import OpenMusicSvg from "../assets/open_music.svg?react";
import CloseMusicSvg from "../assets/close_music.svg?react";
import IvysaurSvg from "../assets/Ivysaur.svg?react";
import SquirtleSvg from "../assets/Squirtle.svg?react";
import CharizardSvg from "../assets/fire.svg?react";
import SlowpokeSvg from "../assets/Slowpoke.svg?react";
import PikachuSvg from "../assets/Pikachu.svg?react";
import Svg from "../assets/15.svg?react";
import { useGlobalContext } from "../hook/globalContext";

const LoadingButton = ({ onClick, isOpen }) => (
  // <div className="loader-heart" onClick={onClick}>
  //   <div className="preloader">
  //     <span></span>
  //     <span></span>
  //     <span></span>
  //   </div>
  //   <div className="shadow"></div>
  // </div>
  <div className="loading ">
    <div className="mask"></div>
    <button
      className={`play-btn ${!isOpen ? "clicked" : ""}`}
      onClick={onClick}
    >
      <Svg />
      <span className="now">GO!</span>
      <span className="play">play</span>
    </button>
  </div>
);

export default function OutsideBtns() {
  const [open, setOpen] = useState(true); //设置按钮
  const [close, setClose] = useState(false); //音乐关闭按钮
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(new Audio("/sounds/bg.mp3"));
  const clickRef = useRef(new Audio("/sounds/click1.mp3"));
  const bgMp3 = new Audio("/sounds/bg.mp3");
  const pausedTimeRef = useRef(0);
  const { collisionCount, isCollision } = useGlobalContext();
  console.log("isCollision", isCollision);
  // 初始按钮
  const handleButtonClick = () => {
    setOpen(!open);
    // clickRef.current.currentTime = 1.01;
    clickRef.current.play();
    setTimeout(() => {
      clickRef.current.pause();
    }, 2000);
    // 模拟异步加载
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setClose(true);
  };
  //音乐播放逻辑
  useEffect(() => {
    const audio = audioRef.current;
    if (!close) {
      // 暂停时间点
      //   console.log(audio.currentTime);
      pausedTimeRef.current = audio.currentTime;
      audio.pause();
    } else {
      audio.currentTime = pausedTimeRef.current;
      audio.play();
    }
    // 清理函数，组件卸载时停止音频
    return () => {
      bgMp3.pause();
    };
  }, [close]);
  return (
    <div className="all_btns">
      {/* LOADER */}
      {isLoading && <LoadingButton onClick={handleButtonClick} isOpen={open} />}
      {/* BUTTON */}
      <FloatButton
        icon={<SettingOutlined />}
        type="primary"
        style={{
          right: 24,
          top: 30,
        }}
        // onClick={() => setClose(!close)}
      />
      <FloatButton
        icon={close ? <OpenMusicSvg /> : <CloseMusicSvg />}
        type="primary"
        style={{
          right: 94,
        }}
        onClick={() => setClose(!close)}
      />
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{
          right: 24,
        }}
        // icon={<CustomerServiceOutlined />}
        icon={<StarSvg />}
        onOpenChange={() => {
          // console.log("珂珂珂珂");
        }}
      >
        {/* <Popover
          placement="left"
          title={"Charizard"}
          content={
            "A colossal flying creature, mastering the power of fire, guards the continent."
          }
        >
          <FloatButton
            type="primary"
            icon={<CharizardSvg />}
            // badge={{
            //   count: Number(collisionCount),
            // }}
          />
        </Popover> */}
        <Popover
          placement="left"
          title={'Pikachu'}
          className={`${isCollision.pikachu ? "done pikachu" : ""}`}
          content={
            "A creature wielding the power of lightning holds a crucial task in its grasp."
          }
        >
          <FloatButton type="primary" icon={<PikachuSvg />} />
        </Popover>
        <Popover
          placement="left"
          title={"SlowPoke"}
          content={
            "A magical creature, innocent and pure, radiating the healing power, fills the surroundings with warmth and tranquility."
          }
          className={`${isCollision.slowpoke ? "done slowpoke" : ""}`}
        >
          <FloatButton type="primary" icon={<SlowpokeSvg />} />
        </Popover>
        <Popover
          placement="left"
          title={"Ivysaur"}
          content={
            "In the gentle breeze of dawn, you will discover a magical creature hidden amidst the blossoming foliage."
          }
          className={`${isCollision.ivysaur ? "done ivysaur" : ""}`}
        >
          <FloatButton
            type="primary"
            icon={<IvysaurSvg />}
            // badge={{
            //   count: Number(collisionCount),
            // }}
          />
        </Popover>
        <Popover
          placement="left"
          title={"Squirtle"}
          className={`${isCollision.squirtl ? "done squirtl" : ""}`}
          content={
            "Beneath the flowing stream of a small bridge hides a magical creature wielding the power of water."
          }
        >
          <FloatButton type="primary" icon={<SquirtleSvg />} />
        </Popover>
      </FloatButton.Group>
      {/*  ILLUSTRATE   */}
      <img src={KeyControlImg} alt="" className="control-img" />
    </div>
  );
}
