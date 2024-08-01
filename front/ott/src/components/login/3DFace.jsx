import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Face = ({ textureUrl }) => {
  const faceRef = useRef();
  const texture = useTexture(textureUrl);

  // 텍스처 반복 설정
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2); // 텍스처의 반복 횟수를 조정하여 크기 조정

  // 좌우로 회전하는 애니메이션
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    faceRef.current.rotation.y = Math.sin(elapsedTime) * Math.PI; // 좌우로 회전
  });

  return (
    <mesh ref={faceRef} scale={[3, 3, 3]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const FaceComponent = ({ imgUrl }) => {
  return (
    <Canvas style={{ width: '150px', height: '150px' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />
      <OrbitControls enableZoom={true} />
      <Face textureUrl={imgUrl} />
    </Canvas>
  );
};

export default FaceComponent;
