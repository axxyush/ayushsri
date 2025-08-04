import React from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Html } from "@react-three/drei";

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={[1.5, 1.5, 1.5]} />;
}

function Ironman() {
  return (
    <>
      {" "}
      <div
        className="col-10 col-sm-8 col-lg-6"
        style={{
          height: "40vh",
          position: "relative",
          overflow: "visible",
          background:
            "radial-gradient(circle at center, rgba(255,0,0,0.4), transparent 55%)",
        }}
      >
        {/* 3D Model Start ***************************/}
        <Canvas
          gl={{ alpha: true }}
          camera={{ position: [-360, -15, 10], fov: 9 }}
          style={{
            background: "transparent",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
            borderRadius: "20px",
            // backgroundColor: "white",
          }}
          className="d-block mx-lg-auto img-fluid d-flex align-items-center"
          alt="Bootstrap Themes"
        >
          <ambientLight intensity={0.1} />

          <hemisphereLight skyColor="#ffffff" intensity={55} />
          <directionalLight position={[10, 20, 10]} intensity={55} castShadow />
          <directionalLight position={[-10, -10, -10]} intensity={10} />
          <pointLight
            color="red"
            intensity={1.5}
            position={[0, -20, 30]}
            distance={100}
            decay={2}
          />

          <Suspense fallback={<Html center>Loading…</Html>}>
            <Center position={[0, 30, 0]}>
              <Model url="/3Dmodels/3Dironman/scene.gltf" />
            </Center>
          </Suspense>

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={1}
          />
        </Canvas>

        {/* 3D Model End ***************************/}
      </div>
    </>
  );
}

export default Ironman;
