/*
 * @Descripttion: 
 * @version: Antares
 * @Author: 
 * @Date: 2023-12-23 11:33:52
 * @LastEditors: Hesin
 * @LastEditTime: 2024-08-29 23:08:26
 */
import React, { Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Leva } from "leva";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import HomePage from "./components/HomePage";
import PlayGround from "./components/PlayGround";
import { GlobalProvider } from "./hook/globalContext";
import LoadingScreen from "./LoadingScreen";

function App() {
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      // Calculate new canvas size based on browser window size
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      console.log(newWidth);
      setCanvasSize({ width: newWidth, height: newHeight });
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    // Initial call to handleResize to set initial canvas size
    handleResize();
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* 1.加载 */}
              <LoadingScreen />
              {/* 2.控制板 */}
              <Leva collapsed />
              {/* 3.Canvas */}
              <Canvas
                shadows
                camera={{ position: [0, 0, 8], fov: 40, near: 0.1, far: 1000 }}
                gl={{ antialias: true }}
                dpr={[1, 1.5]}
              >
                <Suspense fallback={null}>
                  <HomePage />
                </Suspense>
              </Canvas>
            </>
          }
        />
        <Route
          path="/playground"
          element={
            <GlobalProvider>
              <PlayGround />
            </GlobalProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
