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
    if (actions?.["Emote_10493002050"]) {
      actions["Emote_10493002050"].play();
      actions["Emote_10493002050"].setLoop(true);
    }
  }, [actions]);

  return (
    <primitive
      ref={group}
      object={scene}
      scale={[4.3, 4.3, 4.3]}
      position={[0, -6, 0]}
    />
  );
}

function Wolverine() {
  return (
    <div
      className="col-10 col-sm-8 col-lg-6 hero-model-stage"
      style={{
        height: "40vh",
        position: "relative",
        overflow: "visible",
        background:
          "radial-gradient(circle at center, rgba(255, 247, 0, 0.4), transparent 55%)",
      }}
    >
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 5, 30], fov: 25 }}
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
        <hemisphereLight skyColor="#a7bc21ff" intensity={5} />
        <directionalLight position={[10, 20, 10]} intensity={5} castShadow />
        <directionalLight position={[-10, -10, -10]} intensity={1} />
        <pointLight
          color="red"
          intensity={0.5}
          position={[0, -20, 30]}
          distance={100}
          decay={2}
        />
        <FollowLight color="#ffdd44" intensity={3} />

        <Suspense fallback={<ModelLoader color="#eab308" />}>
          <ReactiveGroup>
            <Model url="/3Dmodels/3Dwolverine/scene.gltf" />
          </ReactiveGroup>
        </Suspense>

        <SoftOrbit speed={1} />
      </Canvas>
    </div>
  );
}

export default Wolverine;
