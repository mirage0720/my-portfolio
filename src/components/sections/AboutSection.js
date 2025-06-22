import React from "react";
import { useNavigate } from "react-router-dom";
import TextAnimation from "../common/TextAnimation";

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <TextAnimation
          preset="slide"
          unit="character"
          stagger={0.03}
          as="h2"
          className="text-4xl font-bold text-center mb-16"
        >
          About Me
        </TextAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <TextAnimation
              preset="fade"
              unit="line"
              delay={0.5}
              stagger={0.2}
              as="div"
              className="text-lg text-gray-300 leading-relaxed"
            >
              웹 개발에 대한 열정과 사용자 경험을 최우선으로 생각하는 개발자가
              되기 위해 끊임없는 학습과 성장을 추구합니다
            </TextAnimation>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg">
            <TextAnimation
              preset="slide"
              unit="word"
              delay={1}
              stagger={0.1}
              as="h3"
              className="text-2xl font-semibold mb-6"
            >
              기술 스택
            </TextAnimation>

            <div className="space-y-3">
              <TextAnimation
                preset="fade"
                unit="word"
                delay={1.5}
                stagger={0.05}
                as="div"
                className="text-blue-400"
              >
                React Vue.js JavaScript TypeScript
              </TextAnimation>
              <TextAnimation
                preset="fade"
                unit="word"
                delay={1.7}
                stagger={0.05}
                as="div"
                className="text-green-400"
              >
                Three.js C# Unity
              </TextAnimation>
              <TextAnimation
                preset="fade"
                unit="word"
                delay={1.9}
                stagger={0.05}
                as="div"
                className="text-purple-400"
              >
                Python Django LLM RAG Agent
              </TextAnimation>
              <TextAnimation
                preset="fade"
                unit="word"
                delay={2.1}
                stagger={0.05}
                as="div"
                className="text-yellow-400"
              >
                Node.js Oracle MongoDB
              </TextAnimation>
              <TextAnimation
                preset="fade"
                unit="word"
                delay={2.3}
                stagger={0.05}
                as="div"
                className="text-red-400"
              >
                Git AWS
              </TextAnimation>
            </div>
          </div>
        </div>

        {/* ── 여기서 Resume 보기 버튼 추가 ── */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/resume")}
            className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-lg 
                       hover:bg-blue-500 transition-colors duration-200"
          >
            Resume 보기
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
