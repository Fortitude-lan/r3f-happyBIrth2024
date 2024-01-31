import React, { Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Leva } from "leva";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Loading from "./components/Loading";
import PlayGround from "./components/PlayGround";
import { GlobalProvider } from "./hook/globalContext";

function App() {
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
