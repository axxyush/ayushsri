import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/** Accent light that tracks the pointer across the canvas. */
export function FollowLight({ color = "#ffffff", intensity = 2.5 }) {
  const ref = useRef();
  const { pointer } = useThree();

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.x = THREE.MathUtils.lerp(
      ref.current.position.x,
      pointer.x * 14,
      0.12
    );
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      pointer.y * 8 + 6,
      0.12
    );
    ref.current.position.z = 20;
  });

  return (
    <pointLight
      ref={ref}
      color={color}
      intensity={intensity}
      distance={90}
      decay={2}
    />
  );
}

/** Gentle idle bob + click "suit pulse" scale. */
export function ReactiveGroup({ children }) {
  const ref = useRef();
  const pulse = useRef(1);
  const { gl } = useThree();

  useEffect(() => {
    const el = gl.domElement;
    const onDown = () => {
      pulse.current = 1.14;
    };
    el.addEventListener("pointerdown", onDown);
    el.style.cursor = "grab";
    return () => el.removeEventListener("pointerdown", onDown);
  }, [gl]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = Math.sin(t * 1.2) * 0.15;
    pulse.current = THREE.MathUtils.lerp(pulse.current, 1, 0.1);
    ref.current.scale.setScalar(pulse.current);
  });

  return <group ref={ref}>{children}</group>;
}

/** Soft orbit — drag to inspect, auto-rotate when idle. */
export function SoftOrbit({ speed = 1.2 }) {
  return (
    <OrbitControls
      enablePan={false}
      enableZoom={false}
      enableRotate
      autoRotate
      autoRotateSpeed={speed}
      maxPolarAngle={Math.PI / 1.55}
      minPolarAngle={Math.PI / 2.8}
      dampingFactor={0.08}
      enableDamping
    />
  );
}
