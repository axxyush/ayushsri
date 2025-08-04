import React, { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations, Html } from "@react-three/drei";

function Model({ url }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      const animationNames = Object.keys(actions);
      if (animationNames.length > 1) {
        const secondAnimation = animationNames[2];
        actions[secondAnimation].play();
        actions[secondAnimation].setLoop(true);
        actions[secondAnimation].timeScale = 0.5;
      } else {
        console.warn("Fewer than 2 animations found:", animationNames);
      }
    }
  }, [actions]);

  return (
    <primitive
      ref={group}
      object={scene}
      scale={[8.5, 8.5, 8.5]}
      position={[0, -8, 0]}
    />
  );
}

function Spiderman2099() {
  return (
    <>
      <div
        className="col-10 col-sm-8 col-lg-6"
        style={{
          height: "40vh",
          position: "relative",
          overflow: "visible",
          background:
            "radial-gradient(circle at center, rgba(8, 0, 255, 0.46), transparent 55%)",
        }}
      >
        <Canvas
          gl={{ alpha: true }}
          camera={{
            position: [0, 2, 30],
            fov: 35,
          }}
          style={{
            background: "transparent",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
            borderRadius: "20px",
          }}
          className="d-block mx-lg-auto img-fluid d-flex align-items-center"
          alt="Bootstrap Themes"
        >
          <ambientLight intensity={0.1} />
          <hemisphereLight skyColor="#ffffffff" intensity={10} />
          <directionalLight position={[10, 20, 10]} intensity={20} castShadow />
          <directionalLight position={[-10, -10, -10]} intensity={10} />
          <pointLight
            color="purple"
            intensity={1.6}
            position={[0, -20, 30]}
            distance={100}
            decay={2}
          />

          <Suspense fallback={<Html center>Loading…</Html>}>
            <Model url="/3Dmodels/3Dspiderman2099/scene.gltf" />
          </Suspense>

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={4}
          />
        </Canvas>
      </div>
    </>
  );
}

export default Spiderman2099;
