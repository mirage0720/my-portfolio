import React, { useState, useEffect, useRef, useCallback } from "react";
import BackButton from "../../components/common/BackButton";

const DinoGame = () => {
  const gameAreaRef = useRef(null);
  const dinoRef = useRef(null);
  const [gameState, setGameState] = useState("ready");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("dinoHighScore") || "0")
  );
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState([]);
  const [gameSpeed, setGameSpeed] = useState(2);

  const obstacleIntervalRef = useRef(null);
  const gameLoopRef = useRef(null);
  const scoreIntervalRef = useRef(null);

  const initGame = useCallback(() => {
    setScore(0);
    setObstacles([]);
    setIsJumping(false);
    setGameSpeed(2);
    setGameState("ready");
  }, []);

  const jump = useCallback(() => {
    if (gameState === "playing" && !isJumping) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 600);
    }
  }, [gameState, isJumping]);

  const startGame = useCallback(() => {
    setGameState("playing");

    scoreIntervalRef.current = setInterval(() => {
      setScore((prev) => {
        const next = prev + 1;
        if (next % 100 === 0) setGameSpeed((s) => Math.min(s + 0.5, 8));
        return next;
      });
    }, 100);

    obstacleIntervalRef.current = setInterval(() => {
      setObstacles((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: 800,
          type: Math.random() > 0.5 ? "cactus" : "bird",
          height: Math.random() > 0.5 ? "high" : "low",
        },
      ]);
    }, 2000);
  }, []);

  const gameOver = useCallback(() => {
    setGameState("gameOver");
    clearInterval(scoreIntervalRef.current);
    clearInterval(obstacleIntervalRef.current);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("dinoHighScore", score.toString());
    }
  }, [score, highScore]);

  const checkCollision = useCallback(() => {
    if (gameState !== "playing") return;
    if (!dinoRef.current) return;

    const dinoRect = dinoRef.current.getBoundingClientRect();
    obstacles.forEach((o) => {
      const el = document.getElementById(`obstacle-${o.id}`);
      if (!el) return;
      const obsRect = el.getBoundingClientRect();
      if (
        dinoRect.right > obsRect.left &&
        dinoRect.left < obsRect.right &&
        dinoRect.bottom > obsRect.top &&
        dinoRect.top < obsRect.bottom
      )
        gameOver();
    });
  }, [gameState, obstacles, gameOver]);

  useEffect(() => {
    if (gameState === "playing") {
      gameLoopRef.current = setInterval(() => {
        setObstacles((prev) =>
          prev
            .map((o) => ({ ...o, x: o.x - gameSpeed * 2 }))
            .filter((o) => o.x > -50)
        );
        checkCollision();
      }, 16);
    } else clearInterval(gameLoopRef.current);
    return () => clearInterval(gameLoopRef.current);
  }, [gameState, gameSpeed, checkCollision]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (gameState === "ready") startGame();
        else if (gameState === "playing") jump();
        else if (gameState === "gameOver") initGame();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gameState, startGame, jump, initGame]);

  const handleClick = () => {
    if (gameState === "ready") startGame();
    else if (gameState === "playing") jump();
    else if (gameState === "gameOver") initGame();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* 헤더 */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
        <BackButton to={-1} />
        <div className="text-right">
          <div className="text-lg font-mono">
            점수: {score.toString().padStart(5, "0")}
          </div>
          <div className="text-sm text-gray-600">
            최고점수: {highScore.toString().padStart(5, "0")}
          </div>
        </div>
      </div>

      {/* 게임 영역 */}
      <div
        ref={gameAreaRef}
        className="relative w-full max-w-4xl h-64 bg-white border-b-2 border-gray-400 overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        {/* 구름 */}
        <div className="absolute top-8 left-20 w-12 h-6 bg-gray-300 rounded-full opacity-60"></div>
        <div className="absolute top-12 left-60 w-16 h-8 bg-gray-300 rounded-full opacity-60"></div>
        <div className="absolute top-6 right-40 w-14 h-7 bg-gray-300 rounded-full opacity-60"></div>

        {/* 공룡 */}
        <div
          ref={dinoRef}
          className="absolute left-20 w-10 h-12 transition-all duration-300"
          style={{ bottom: isJumping ? "4rem" : "0" }}
        >
          <div className="absolute top-0 left-6 w-4 h-6 bg-gray-700 rounded-t-lg"></div>
          <div className="absolute top-1 left-8 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-4 left-4 w-6 h-6 bg-gray-700 rounded"></div>
          <div className="absolute top-6 left-2 w-3 h-2 bg-gray-700 rounded"></div>
          <div
            className={`absolute bottom-0 left-5 w-1 h-3 bg-gray-700 ${
              gameState === "playing" && !isJumping ? "animate-pulse" : ""
            }`}
          ></div>
          <div
            className={`absolute bottom-0 left-7 w-1 h-3 bg-gray-700 ${
              gameState === "playing" && !isJumping ? "animate-pulse" : ""
            }`}
          ></div>
        </div>

        {/* 장애물 */}
        {obstacles.map((o) => (
          <div
            id={`obstacle-${o.id}`}
            key={o.id}
            className="absolute"
            style={{
              bottom:
                o.type === "cactus"
                  ? "0"
                  : o.height === "high"
                  ? "3rem"
                  : "1.5rem",
              left: o.x,
            }}
          >
            {o.type === "cactus" ? (
              <div className="w-6 h-12 bg-green-600 relative">
                <div className="w-6 h-8 bg-green-600 rounded-t-full"></div>
                <div className="absolute top-3 -left-2 w-3 h-4 bg-green-600 rounded-l-full"></div>
                <div className="absolute top-1 -right-2 w-3 h-6 bg-green-600 rounded-r-full"></div>
              </div>
            ) : (
              <div className="w-8 h-4 bg-gray-600 rounded-full relative">
                <div className="absolute -left-1 top-1 w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="absolute -right-1 top-1 w-2 h-2 bg-gray-600 rounded-full"></div>
              </div>
            )}
          </div>
        ))}

        {/* 상태 오버레이 */}
        {gameState === "ready" && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">크롬 공룡 게임</h2>
              <p className="mb-4">스페이스바 또는 클릭하여 시작</p>
              <p className="text-sm text-gray-600">
                점프: 스페이스바 / 화살표 위 / 클릭
              </p>
            </div>
          </div>
        )}
        {gameState === "gameOver" && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">게임 오버!</h2>
              <p className="mb-2">점수: {score}</p>
              {score === highScore && score > 0 && (
                <p className="mb-4 text-yellow-600 font-bold">
                  🎉 새로운 최고 기록!
                </p>
              )}
              <p className="text-sm text-gray-600">
                스페이스바 또는 클릭하여 다시 시작
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 안내문 */}
      <div className="mt-6 text-center text-gray-600">
        <p>장애물을 피해 최대한 멀리 달려보세요!</p>
        <p className="text-sm mt-2">
          선인장과 새를 조심하세요. 속도는 점점 빨라집니다!
        </p>
      </div>
    </div>
  );
};

export default DinoGame;
