import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import BackButton from "../../components/common/BackButton";

const Character3D = () => {
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  // 🚗 차량 정보 + 키 상태 실시간 반영용 state
  const [carInfo, setCarInfo] = useState({
    speed: 0,
    position: { x: 0, z: 0 },
    rotation: 0,
    isOnGround: true,
    keys: { w: false, a: false, s: false, d: false, shift: false },
  });

  // Three.js refs
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const carRef = useRef(null);
  const animationRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const obstaclesRef = useRef([]);

  // 자동차 상태
  const carState = useRef({
    position: new THREE.Vector3(0, 1, 0),
    velocity: new THREE.Vector3(0, 0, 0),
    rotation: 0,
    targetRotation: 0,
    speed: 0,
    maxSpeed: 25,
    acceleration: 0.8,
    friction: 0.9,
    turnSpeed: 0.06,
    wheelRotation: 0,
    bodyTilt: 0,
    targetBodyTilt: 0,
    isOnGround: true,
    jumpVelocity: 0,
    gravity: -30,
  });

  // 키보드 상태
  const keys = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
    shift: false,
    space: false,
    r: false,
  });

  // 카메라 컨트롤
  const cameraControl = useRef({
    target: new THREE.Vector3(0, 0, 0),
    position: new THREE.Vector3(0, 8, 12),
    smoothness: 0.1,
    height: 8,
    distance: 12,
    mouseX: 0,
    mouseY: 0,
    sensitivity: 0.002,
  });

  // 3D 텍스트 생성 함수
  const create3DText = useCallback(
    (text, position, color = 0xffffff, size = 1) => {
      const textGroup = new THREE.Group();
      const letters = text.split("");
      const letterGeometry = new THREE.BoxGeometry(
        size * 0.8,
        size * 1.2,
        size * 0.3
      );
      const letterMaterial = new THREE.MeshLambertMaterial({
        color: color,
        transparent: true,
        opacity: 0.9,
      });

      letters.forEach((letter, index) => {
        if (letter === " ") return;
        const letterMesh = new THREE.Mesh(letterGeometry, letterMaterial);
        letterMesh.position.x = index * size * 0.9;
        letterMesh.position.y = 0;
        letterMesh.castShadow = true;
        letterMesh.receiveShadow = true;
        textGroup.add(letterMesh);
      });

      textGroup.position.copy(position);
      return textGroup;
    },
    []
  );

  // 자동차 생성 함수
  const createCar = useCallback(() => {
    const carGroup = new THREE.Group();
    const bodyGeometry = new THREE.BoxGeometry(2.2, 0.8, 4.5);
    const bodyMaterial = new THREE.MeshLambertMaterial({
      color: 0xff4444,
      transparent: true,
      opacity: 0.95,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.4;
    body.castShadow = true;
    carGroup.add(body);

    const roofGeometry = new THREE.BoxGeometry(1.8, 1.0, 2.8);
    const roofMaterial = new THREE.MeshLambertMaterial({ color: 0xcc2222 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(0, 1.2, -0.3);
    roof.castShadow = true;
    carGroup.add(roof);

    const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 8);
    const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });
    const wheels = [];
    const wheelPositions = [
      [-1.0, 0, 1.5],
      [1.0, 0, 1.5],
      [-1.0, 0, -1.5],
      [1.0, 0, -1.5],
    ];
    wheelPositions.forEach((pos) => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.position.set(pos[0], pos[1], pos[2]);
      wheel.rotation.z = Math.PI / 2;
      wheel.castShadow = true;
      carGroup.add(wheel);
      wheels.push(wheel);
    });

    const headlightGeometry = new THREE.SphereGeometry(0.2, 6, 6);
    const headlightMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffaa,
      emissive: 0xffff44,
      emissiveIntensity: 0.3,
    });
    const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    leftHeadlight.position.set(-0.7, 0.5, 2.3);
    carGroup.add(leftHeadlight);

    const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    rightHeadlight.position.set(0.7, 0.5, 2.3);
    carGroup.add(rightHeadlight);

    carGroup.userData = { body, roof, wheels };
    return carGroup;
  }, []);

  // 환경 생성
  const createEnvironment = useCallback(
    (scene) => {
      const obstacles = [];
      const groundGeometry = new THREE.PlaneGeometry(120, 120);
      const groundMaterial = new THREE.MeshLambertMaterial({
        color: 0xcc8866,
      });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      scene.add(ground);

      const texts = [
        {
          text: "BRUNO",
          position: new THREE.Vector3(-15, 2, -20),
          color: 0xffffff,
          size: 2,
        },
        {
          text: "SIMON",
          position: new THREE.Vector3(-15, 2, -15),
          color: 0xffffff,
          size: 2,
        },
        {
          text: "CREATIVE",
          position: new THREE.Vector3(10, 1.5, -10),
          color: 0x44ff44,
          size: 1.5,
        },
        {
          text: "DEVELOPER",
          position: new THREE.Vector3(-18, 1.5, 8),
          color: 0x4444ff,
          size: 1.5,
        },
        {
          text: "PORTFOLIO",
          position: new THREE.Vector3(12, 1.5, 18),
          color: 0xff4444,
          size: 1.5,
        },
      ];
      texts.forEach((textData) => {
        const textMesh = create3DText(
          textData.text,
          textData.position,
          textData.color,
          textData.size
        );
        scene.add(textMesh);
        obstacles.push(textMesh);
      });

      const boxPositions = [
        { pos: [-25, 1, -5], size: [2, 2, 2], color: 0x88ff88 },
        { pos: [25, 1, 10], size: [3, 2, 3], color: 0xff8888 },
        { pos: [0, 1, -30], size: [4, 2, 2], color: 0x8888ff },
        { pos: [-20, 1, 25], size: [2, 3, 2], color: 0xffff88 },
      ];
      boxPositions.forEach((data) => {
        const boxGeometry = new THREE.BoxGeometry(
          data.size[0],
          data.size[1],
          data.size[2]
        );
        const boxMaterial = new THREE.MeshLambertMaterial({
          color: data.color,
          transparent: true,
          opacity: 0.8,
        });
        const box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.position.set(data.pos[0], data.pos[1], data.pos[2]);
        box.castShadow = true;
        box.receiveShadow = true;
        scene.add(box);
        obstacles.push(box);
      });

      return obstacles;
    },
    [create3DText]
  );

  // 충돌 감지 함수
  const checkCollisions = useCallback((newPosition) => {
    const carBox = new THREE.Box3().setFromCenterAndSize(
      newPosition,
      new THREE.Vector3(2.5, 1.5, 5)
    );
    for (let obstacle of obstaclesRef.current) {
      const obstacleBox = new THREE.Box3().setFromObject(obstacle);
      if (carBox.intersectsBox(obstacleBox)) {
        return true;
      }
    }
    return false;
  }, []);

  // 자동차 업데이트 함수
  const updateCar = useCallback(
    (deltaTime) => {
      const car = carRef.current;
      if (!car) return;
      const state = carState.current;
      const dt = Math.min(deltaTime, 0.05);

      let acceleration = 0;
      let turning = 0;
      let boost = keys.current.shift ? 2.5 : 1.0;

      if (keys.current.w) acceleration = state.acceleration * boost * 2;
      if (keys.current.s) acceleration = -state.acceleration * 1.5;
      if (keys.current.a) turning = state.turnSpeed * 1.5;
      if (keys.current.d) turning = -state.turnSpeed * 1.5;

      if (keys.current.r) {
        state.position.set(0, 1, 0);
        state.velocity.set(0, 0, 0);
        state.speed = 0;
        state.rotation = 0;
        state.jumpVelocity = 0;
        state.isOnGround = true;
        keys.current.r = false;
      }
      if (keys.current.space && state.isOnGround) {
        state.jumpVelocity = 18;
        state.isOnGround = false;
        keys.current.space = false;
      }

      state.speed += acceleration * dt * 100;
      state.speed *= Math.pow(state.friction, dt * 30);
      state.speed = Math.max(
        -state.maxSpeed * 0.8,
        Math.min(state.maxSpeed, state.speed)
      );
      if (Math.abs(turning) > 0) {
        const rotationAmount = turning * dt * 60;
        state.rotation += rotationAmount;
        state.targetBodyTilt = turning * -25;
      } else {
        state.targetBodyTilt = 0;
      }
      if (!state.isOnGround) {
        state.jumpVelocity += state.gravity * dt;
        const newY = state.position.y + state.jumpVelocity * dt;
        if (newY <= 1) {
          state.position.y = 1;
          state.jumpVelocity = 0;
          state.isOnGround = true;
        } else {
          state.position.y = newY;
        }
      }
      if (Math.abs(state.speed) > 0.1) {
        const moveX = Math.sin(state.rotation) * state.speed * dt;
        const moveZ = Math.cos(state.rotation) * state.speed * dt;
        const newPosition = state.position.clone();
        newPosition.x += moveX;
        newPosition.z += moveZ;
        if (!checkCollisions(newPosition)) {
          state.position.copy(newPosition);
        } else {
          state.speed *= 0.3;
        }
      }
      state.position.x = Math.max(-55, Math.min(55, state.position.x));
      state.position.z = Math.max(-55, Math.min(55, state.position.z));
      car.position.copy(state.position);
      car.rotation.y = state.rotation;

      const userData = car.userData;
      if (userData && userData.wheels) {
        state.wheelRotation += state.speed * dt * 5;
        userData.wheels.forEach((wheel) => {
          wheel.rotation.x = state.wheelRotation;
        });
      }
      state.bodyTilt += (state.targetBodyTilt - state.bodyTilt) * 0.2;
      if (userData && userData.body) {
        userData.body.rotation.z = state.bodyTilt * 0.015;
        userData.roof.rotation.z = state.bodyTilt * 0.015;
      }
    },
    [checkCollisions]
  );

  // 카메라 업데이트 함수
  const updateCamera = useCallback(() => {
    const camera = cameraRef.current;
    const car = carRef.current;
    if (!camera || !car) return;
    const state = carState.current;
    const control = cameraControl.current;
    const cameraOffset = new THREE.Vector3(
      -Math.sin(state.rotation) * control.distance,
      control.height,
      -Math.cos(state.rotation) * control.distance
    );
    const idealPosition = state.position.clone().add(cameraOffset);
    const idealTarget = state.position.clone();
    idealTarget.y += 2;
    control.position.lerp(idealPosition, control.smoothness);
    control.target.lerp(idealTarget, control.smoothness);
    camera.position.copy(control.position);
    camera.lookAt(control.target);
  }, []);

  useEffect(() => {
    // ✅ mountRef.current를 변수에 저장 (ESLint 경고 해결)
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe0a060);
    scene.fog = new THREE.Fog(0xe0a060, 40, 120);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      500
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0xe0a060);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.zIndex = "0";
    rendererRef.current = renderer;

    currentMount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.9);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(50, 60, 30);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 150;
    directionalLight.shadow.camera.left = -80;
    directionalLight.shadow.camera.right = 80;
    directionalLight.shadow.camera.top = 80;
    directionalLight.shadow.camera.bottom = -80;
    scene.add(directionalLight);

    const obstacles = createEnvironment(scene);
    obstaclesRef.current = obstacles;

    const car = createCar();
    scene.add(car);
    carRef.current = car;

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (
        key === "w" ||
        key === "a" ||
        key === "s" ||
        key === "d" ||
        key === " " ||
        key === "r" ||
        key === "shift"
      ) {
        event.preventDefault();
      }
      if (key === " " || key === "spacebar") {
        keys.current.space = true;
      } else if (keys.current.hasOwnProperty(key)) {
        keys.current[key] = true;
      }
    };
    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();
      if (key === " " || key === "spacebar") {
        keys.current.space = false;
      } else if (keys.current.hasOwnProperty(key)) {
        keys.current[key] = false;
      }
    };
    const handleMouseMove = (event) => {
      const control = cameraControl.current;
      control.mouseX =
        (event.clientX - window.innerWidth / 2) * control.sensitivity;
      control.mouseY =
        (event.clientY - window.innerHeight / 2) * control.sensitivity;
    };
    const handleWheel = (event) => {
      event.preventDefault();
      const control = cameraControl.current;
      control.distance += event.deltaY * 0.01;
      control.distance = Math.max(6, Math.min(20, control.distance));
    };
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    const canvas = renderer.domElement;
    canvas.tabIndex = 1;
    canvas.focus();
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("click", () => {
      canvas.focus();
    });

    // ✔ 애니메이션 루프 내에서 carInfo 상태 동기화!
    let frame = 0;
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const deltaTime = clockRef.current.getDelta();
      updateCar(deltaTime);
      updateCamera();
      renderer.render(scene, camera);

      // 너무 잦은 setState는 성능 저하, 2프레임에 한 번 정도로 최적화
      frame++;
      if (frame % 2 === 0) {
        setCarInfo({
          speed: Math.abs(carState.current.speed),
          position: {
            x: carState.current.position.x,
            z: carState.current.position.z,
          },
          rotation: carState.current.rotation,
          isOnGround: carState.current.isOnGround,
          keys: {
            w: keys.current.w,
            a: keys.current.a,
            s: keys.current.s,
            d: keys.current.d,
            shift: keys.current.shift,
          },
        });
      }
    };
    animate();
    setIsLoaded(true);

    setTimeout(() => {
      setShowInstructions(false);
    }, 8000);

    // ✅ cleanup 함수에서 currentMount 변수 사용 (ESLint 경고 해결)
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (
        currentMount &&
        renderer.domElement &&
        currentMount.contains(renderer.domElement)
      ) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [createCar, createEnvironment, updateCar, updateCamera]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-orange-300 to-yellow-200 overflow-hidden">
      {/* 캔버스 */}
      <BackButton to={-1} />
      <div ref={mountRef} className="w-full h-full absolute top-0 left-0 z-0" />

      {/* 메인 타이틀 */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-20 pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-wider drop-shadow-lg">
          3D Character PORTFOLIO
        </h1>
        <p className="text-lg md:text-xl text-gray-800 drop-shadow">
          Drive around the 3D world! Click canvas first, then use WASD keys
        </p>
      </div>

      {/* 컨트롤 가이드 */}
      {showInstructions && (
        <div className="absolute top-4 left-4 bg-black bg-opacity-90 p-6 rounded-xl text-white max-w-sm z-30">
          <h3 className="text-xl font-bold mb-4 text-yellow-400">Controls</h3>
          <div className="space-y-2 text-sm">
            <p className="text-red-400 font-bold mb-3">
              🖱️ CLICK CANVAS FIRST TO ACTIVATE!
            </p>
            <p>
              <span className="font-semibold text-blue-300">W/S:</span>{" "}
              Accelerate/Brake
            </p>
            <p>
              <span className="font-semibold text-blue-300">A/D:</span> Turn
              Left/Right
            </p>
            <p>
              <span className="font-semibold text-green-300">SHIFT:</span> Turbo
              Boost
            </p>
            <p>
              <span className="font-semibold text-purple-300">SPACE:</span> Jump
            </p>
            <p>
              <span className="font-semibold text-red-300">R:</span> Reset
              Position
            </p>
            <p>
              <span className="font-semibold text-yellow-300">Mouse:</span>{" "}
              Camera Look
            </p>
            <p>
              <span className="font-semibold text-cyan-300">Wheel:</span> Zoom
              In/Out
            </p>
            <p className="text-gray-400 mt-3">
              Navigate the world! Much more responsive now!
            </p>
          </div>
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-sm transition-colors"
          >
            Let's Drive!
          </button>
        </div>
      )}

      {/* 차량 정보 */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-80 p-4 rounded-xl text-white text-sm z-20">
        <div className="space-y-1">
          <p>
            Speed:{" "}
            <span className="text-green-400">{carInfo.speed.toFixed(1)}</span>
          </p>
          <p>
            Position:{" "}
            <span className="text-blue-400">
              ({carInfo.position.x.toFixed(1)}, {carInfo.position.z.toFixed(1)})
            </span>
          </p>
          <p>
            Status:{" "}
            <span
              className={
                carInfo.isOnGround ? "text-green-400" : "text-yellow-400"
              }
            >
              {carInfo.isOnGround ? "On Ground" : "Flying"}
            </span>
          </p>
          {carInfo.keys.shift && (
            <p className="text-red-400 font-bold">🚀 TURBO ACTIVE</p>
          )}
          <p className="text-gray-400 text-xs mt-2">
            Keys: W={carInfo.keys.w ? "✓" : "✗"} S={carInfo.keys.s ? "✓" : "✗"}{" "}
            A={carInfo.keys.a ? "✓" : "✗"} D={carInfo.keys.d ? "✓" : "✗"}
          </p>
        </div>
      </div>

      {/* 미니맵 */}
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-80 p-4 rounded-xl z-20">
        <h4 className="text-white text-sm font-bold mb-2">Mini Map</h4>
        <div className="w-32 h-32 bg-orange-200 rounded-lg relative border-2 border-orange-600">
          <div
            className="absolute w-2 h-2 bg-red-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: `${50 + (carInfo.position.x / 55) * 40}%`,
              top: `${50 + (carInfo.position.z / 55) * 40}%`,
              transform: `translate(-50%, -50%) rotate(${carInfo.rotation}rad)`,
            }}
          />
          <div
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: "30%", top: "20%" }}
          />
          <div
            className="absolute w-1 h-1 bg-green-400 rounded-full"
            style={{ right: "25%", top: "35%" }}
          />
          <div
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{ left: "25%", bottom: "30%" }}
          />
          <div
            className="absolute w-1 h-1 bg-red-400 rounded-full"
            style={{ right: "20%", bottom: "20%" }}
          />
        </div>
      </div>

      {/* 로딩 화면 */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-orange-300 to-yellow-200 z-50">
          <div className="text-center">
            <div className="text-gray-800 text-3xl mb-6">
              Loading Enhanced Experience...
            </div>
            <div className="w-16 h-16 border-4 border-gray-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Character3D;
