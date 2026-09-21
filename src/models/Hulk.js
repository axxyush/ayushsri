import React, { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { FollowLight, ReactiveGroup, SoftOrbit } from "./HeroReactivity";
import ModelLoader from "./ModelLoader";

function Model({ url }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions?.["Walk_Fwd_C"]) {
      actions["Walk_Fwd_C"].play();
      actions["Walk_Fwd_C"].setLoop(true);
    }
  }, [actions]);

  return (
    <primitive
      ref={group}
      object={scene}
      scale={[4.0, 4.0, 4.0]}
      position={[0, -4.5, 0]}
    />
  );
}

function Hulk() {
  return (
    <div
      className="col-10 col-sm-8 col-lg-6 hero-model-stage"
      style={{
        height: "40vh",
        position: "relative",
        overflow: "visible",
        background:
          "radial-gradient(circle at center, rgba(89, 255, 0, 0.4), transparent 55%)",
      }}
    >
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        camera={{ position: [10, 5, 14], fov: 35 }}
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
      >
        <ambientLight intensity={0.1} />
        <hemisphereLight skyColor="#a7bc21ff" intensity={2} />
        <directionalLight position={[10, 20, 10]} intensity={2} castShadow />
        <directionalLight position={[-10, -10, -10]} intensity={1} />
        <pointLight
          color="green"
          intensity={3.5}
          position={[0, -20, 30]}
          distance={100}
          decay={2}
        />
        <FollowLight color="#66ff66" intensity={3} />

        <Suspense fallback={<ModelLoader color="#22c55e" />}>
          <ReactiveGroup>
            <Model url="/3Dmodels/3Dhulk/scene.gltf" />
          </ReactiveGroup>
        </Suspense>

        <SoftOrbit speed={2.5} />
      </Canvas>
    </div>
  );
}

export default Hulk;
