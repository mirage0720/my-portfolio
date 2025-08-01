import React from "react";
import {
  SiReact,
  SiVuedotjs,
  SiJavascript,
  SiTypescript,
  SiThreedotjs,
  SiDotnet,
  SiUnity,
  SiPython,
  SiDjango,
  SiNodedotjs,
  SiOracle,
  SiMongodb,
  SiGit,
  SiAmazonwebservices,
} from "react-icons/si";
import { FaRobot } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import TextAnimation from "../common/TextAnimation";

const AboutSection = () => {
  const navigate = useNavigate();

  // 기술 스택 데이터
  const techStacks = [
    { name: "React", icon: <SiReact />, color: "text-blue-400" },
    { name: "Vue.js", icon: <SiVuedotjs />, color: "text-green-400" },
    { name: "JavaScript", icon: <SiJavascript />, color: "text-yellow-400" },
    { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-400" },
    { name: "Three.js", icon: <SiThreedotjs />, color: "text-green-400" },
    { name: "C#", icon: <SiDotnet />, color: "text-purple-400" },
    { name: "Unity", icon: <SiUnity />, color: "text-green-400" },
    { name: "Python", icon: <SiPython />, color: "text-purple-400" },
    { name: "Django", icon: <SiDjango />, color: "text-purple-400" },
    { name: "LLM", icon: <FaRobot />, color: "text-purple-400" },
    { name: "RAG", icon: <AiOutlineSearch />, color: "text-purple-400" },
    { name: "Agent", icon: <FaRobot />, color: "text-purple-400" },
    { name: "Node.js", icon: <SiNodedotjs />, color: "text-yellow-400" },
    { name: "Oracle", icon: <SiOracle />, color: "text-yellow-400" },
    { name: "MongoDB", icon: <SiMongodb />, color: "text-yellow-400" },
    { name: "Git", icon: <SiGit />, color: "text-red-400" },
    { name: "AWS", icon: <SiAmazonwebservices />, color: "text-red-400" },
  ];

  // 캐러셀 아이템 컴포넌트
  const TechItem = ({ tech }) => (
    <div className="flex items-center space-x-2 bg-gray-700/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-600/50 hover:border-gray-500 transition-all duration-300 hover:scale-105 whitespace-nowrap mx-2">
      <span className="text-xl">{tech.icon}</span>
      <span className={`font-medium text-sm ${tech.color}`}>{tech.name}</span>
    </div>
  );

  // 무한 캐러셀 컴포넌트
  const InfiniteCarousel = ({ items, speed = "20s" }) => {
    const duplicatedItems = [...items, ...items, ...items];

    return (
      <div className="overflow-hidden relative">
        <div
          className="flex animate-scroll"
          style={{
            animation: `scroll-left ${speed} linear infinite`,
            width: "max-content",
          }}
        >
          {duplicatedItems.map((tech, index) => (
            <TechItem key={`${tech.name}-${index}`} tech={tech} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
        
        `,
        }}
      />

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

              <div className="space-y-4">
                <InfiniteCarousel items={techStacks} speed="25s" />
              </div>
            </div>
          </div>

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
    </>
  );
};

export default AboutSection;
