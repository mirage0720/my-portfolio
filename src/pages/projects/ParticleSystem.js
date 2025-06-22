import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

const ParticleSystem = () => {
  const mountRef = useRef(null);
  const navigate = useNavigate();
  const [particleCount, setParticleCount] = useState(10000);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [colorMode, setColorMode] = useState("rainbow");
  const sceneRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    // 씬 생성
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 카메라 생성
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // 렌더러 생성
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 파티클 시스템 생성
    const createParticleSystem = (count) => {
      // 기존 파티클 제거
      if (particlesRef.current) {
        scene.remove(particlesRef.current);
        particlesRef.current.geometry.dispose();
        particlesRef.current.material.dispose();
      }

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      // 파티클 초기 위치, 색상, 속도 설정
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // 구형 분포로 파티클 배치
        const radius = Math.random() * 30 + 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        // 색상 설정
        if (colorMode === "rainbow") {
          const hue = (i / count) * 360;
          const color = new THREE.Color().setHSL(hue / 360, 1, 0.5);
          colors[i3] = color.r;
          colors[i3 + 1] = color.g;
          colors[i3 + 2] = color.b;
        } else if (colorMode === "blue") {
          colors[i3] = Math.random() * 0.5;
          colors[i3 + 1] = Math.random() * 0.5 + 0.5;
          colors[i3 + 2] = 1;
        } else {
          // fire
          colors[i3] = 1;
          colors[i3 + 1] = Math.random() * 0.5;
          colors[i3 + 2] = 0;
        }

        // 속도 설정 (중심으로 향하는 나선 운동)
        velocities[i3] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

        // 크기 설정
        sizes[i] = Math.random() * 2 + 1;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute(
        "velocity",
        new THREE.BufferAttribute(velocities, 3)
      );
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(geometry, material);
      particlesRef.current = particles;
      scene.add(particles);

      return { geometry, material, particles };
    };

    let { geometry, particles } = createParticleSystem(particleCount);

    // 마우스 위치 추적
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 애니메이션 루프
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01 * animationSpeed;

      if (particles && geometry) {
        const positions = geometry.attributes.position.array;
        const velocities = geometry.attributes.velocity.array;
        const colors = geometry.attributes.color.array;

        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;

          // 나선 운동
          const radius = Math.sqrt(
            positions[i3] ** 2 + positions[i3 + 1] ** 2 + positions[i3 + 2] ** 2
          );
          const angle =
            Math.atan2(positions[i3 + 1], positions[i3]) +
            0.01 * animationSpeed;

          positions[i3] += Math.cos(angle + time) * 0.1 * animationSpeed;
          positions[i3 + 1] += Math.sin(angle + time) * 0.1 * animationSpeed;
          positions[i3 + 2] +=
            Math.sin(time + i * 0.01) * 0.05 * animationSpeed;

          // 마우스 상호작용
          const mouseInfluence = 5;
          const mouseX = mouse.x * 50;
          const mouseY = mouse.y * 50;
          const dx = mouseX - positions[i3];
          const dy = mouseY - positions[i3 + 1];
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseInfluence) {
            const force = (mouseInfluence - distance) / mouseInfluence;
            positions[i3] += dx * force * 0.01;
            positions[i3 + 1] += dy * force * 0.01;
          }

          // 경계 처리 (파티클이 너무 멀리 가지 않도록)
          if (Math.abs(positions[i3]) > 60) positions[i3] *= 0.99;
          if (Math.abs(positions[i3 + 1]) > 60) positions[i3 + 1] *= 0.99;
          if (Math.abs(positions[i3 + 2]) > 60) positions[i3 + 2] *= 0.99;

          // 색상 애니메이션
          if (colorMode === "rainbow") {
            const hue = (time + i * 0.01) % 1;
            const color = new THREE.Color().setHSL(hue, 1, 0.5);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
          }
        }

        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;
      }

      // 카메라 회전
      camera.position.x = Math.cos(time * 0.1) * 70;
      camera.position.z = Math.sin(time * 0.1) * 70;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 윈도우 리사이즈 처리
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // 클린업
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (geometry) geometry.dispose();
      if (particles && particles.material) particles.material.dispose();
      renderer.dispose();
    };
  }, [particleCount, animationSpeed, colorMode]);

  const handleParticleCountChange = (count) => {
    setParticleCount(count);
  };

  const handleSpeedChange = (speed) => {
    setAnimationSpeed(speed);
  };

  const handleColorModeChange = (mode) => {
    setColorMode(mode);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />

      {/* 컨트롤 패널 */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-70 p-4 rounded-lg text-white min-w-64">
        <h2 className="text-xl font-bold mb-4">WebGL 파티클 시스템</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">
              파티클 수: {particleCount.toLocaleString()}
            </label>
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={particleCount}
              onChange={(e) =>
                handleParticleCountChange(parseInt(e.target.value))
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">
              애니메이션 속도: {animationSpeed}x
            </label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={animationSpeed}
              onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">색상 모드</label>
            <select
              value={colorMode}
              onChange={(e) => handleColorModeChange(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
            >
              <option value="rainbow">무지개</option>
              <option value="blue">파란색</option>
              <option value="fire">불꽃</option>
            </select>
          </div>
        </div>
      </div>

      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 right-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
      >
        홈으로 돌아가기
      </button>

      {/* 조작 안내 */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 p-3 rounded-lg text-white text-sm max-w-80">
        <p>마우스를 움직여 파티클과 상호작용할 수 있습니다</p>
        <p>카메라가 자동으로 회전하며 전체 시스템을 보여줍니다</p>
      </div>

      {/* 성능 정보 */}
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 p-3 rounded-lg text-white text-sm">
        <p>현재 파티클 수: {particleCount.toLocaleString()}</p>
        <p>GPU 가속 활성화</p>
      </div>
    </div>
  );
};

export default ParticleSystem;
