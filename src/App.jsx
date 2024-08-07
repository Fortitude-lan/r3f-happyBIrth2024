/*
 * @Descripttion: 
 * @version: Antares
 * @Author: 
 * @Date: 2023-12-23 11:33:52
 * @LastEditors: Antares
 * @LastEditTime: 2024-07-03 19:39:32
 */
import React, { Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Leva } from "leva";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Loading from "./components/Loading";
import PlayGround from "./components/PlayGround";
import { GlobalProvider } from "./hook/globalContext";

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
              <Leva collapsed />

              <Canvas shadows camera={{ position: [0, 0, 5], fov: 40 }}>
                <Suspense fallback={<Loading />}>
                  <Experience />
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
