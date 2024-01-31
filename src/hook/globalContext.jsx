import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [collisionCount, setCollisionCount] = useState(0);
  const [isCollision, setIsCollision] = useState({
    pikachu: false,
    ivysaur: false,
    squirtl: false,
    charizard: false,
    slowpoke: false,
  });

  const handleCollision = () => {
    setCollisionCount((prevCount) => prevCount + 1);
  };
  const handleIsCollision = (name) => {
    setIsCollision((prevCount) => {
      return {
        ...prevCount,
        [name]: true,
      };
    });
  };
  return (
    <GlobalContext.Provider
      value={{
        collisionCount,
        handleCollision,
        handleIsCollision,
        isCollision,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
