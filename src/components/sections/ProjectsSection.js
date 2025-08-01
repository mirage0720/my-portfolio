import React from "react";
import { useNavigate } from "react-router-dom";
import TextAnimation from "../common/TextAnimation";

const ProjectsSection = () => {
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      title: "크롬 공룡 점프 게임",
      description: "인터넷 연결 끊겼을 때 나오는 클래식 공룡 게임",
      technologies: ["React", "CSS Animation", "JavaScript"],
      path: "/projects/dino-game",
      tag: "개인 프로젝트",
    },
    {
      id: 2,
      title: "3D 캐릭터 컨트롤러",
      description: "방향키로 조작하는 3D 환경 탐험 게임",
      technologies: ["React", "Three.js", "WASD Controls"],
      path: "/projects/3d-character",
      tag: "개인 프로젝트",
    },
    {
      id: 3,
      title: "실시간 채팅 메신저",
      description:
        "Discord 스타일의 인터랙티브 채팅 시뮬레이터 (Socket 없이 가상 대화로 구현)",
      technologies: ["React", "UI/UX", "상태관리", "애니메이션"],
      path: "/projects/chat-messenger",
      tag: "개인 프로젝트",
    },
  ];

  const otherProjects = [
    {
      id: 4,
      title: "영단어 학습 플랫폼 VOCADO",
      path: "/projects/vocabulary-platform",
      tag: "(주)천재교육/개인개발",
    },
    {
      id: 5,
      title: "AI 챗봇 개발",
      path: "/projects/ai-chatbot",
      tag: "(주)천재교육",
    },
    {
      id: 6,
      title: "반응형 웹사이트 제작",
      path: "/projects/responsive-site",
      tag: "알고소프트",
    },
    {
      id: 7,
      title: "Unity 활용 3D 게임 제작",
      path: "/projects/unity-game",
      tag: "개인 프로젝트",
    },
  ];

  // 태그별 색상 지정 함수
  const tagColor = (tag) => {
    if (tag.includes("천재교육")) return "bg-blue-700/80";
    if (tag.includes("알고소프트")) return "bg-violet-700/80";
    if (tag.includes("개인")) return "bg-gray-600/80";
    return "bg-gray-500/70";
  };

  return (
    <section className="py-20 px-8 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* 주요 프로젝트 */}
        <TextAnimation
          preset="slide"
          unit="word"
          stagger={0.15}
          as="h2"
          className="text-4xl font-bold text-center mb-16 text-white"
        >
          주요 프로젝트
        </TextAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-gray-900 p-6 rounded-2xl cursor-pointer
                         border border-gray-800
                         hover:bg-gray-850 transition-all duration-300
                         hover:scale-105 hover:shadow-2xl relative group"
              onClick={() => navigate(project.path)}
            >
              {/* Tag Badge - 오른쪽 하단에 배치 */}
              {project.tag && (
                <span
                  className={`absolute right-5 bottom-5 px-2 py-0.5 rounded text-xs font-normal ${tagColor(
                    project.tag
                  )} text-white shadow self-end`}
                  style={{ zIndex: 10 }}
                >
                  {project.tag}
                </span>
              )}

              <div
                className="absolute -inset-1 rounded-2xl z-[-1] opacity-0 group-hover:opacity-100 transition pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at top left, #6366f1cc 0%, transparent 70%)",
                }}
              />
              <TextAnimation
                preset="fade"
                unit="word"
                delay={index * 0.2}
                stagger={0.1}
                as="h3"
                className="text-xl font-semibold mb-4 text-white"
              >
                {project.title}
              </TextAnimation>

              <TextAnimation
                preset="slide"
                unit="character"
                delay={index * 0.2 + 0.3}
                stagger={0.01}
                as="p"
                className="text-gray-400 mb-4"
              >
                {project.description}
              </TextAnimation>

              <div className="flex flex-wrap mb-4 items-center">
                {/* 기술 태그 */}
                {project.technologies.map((tech, techIndex) => (
                  <TextAnimation
                    key={techIndex}
                    preset="fade"
                    unit="word"
                    delay={index * 0.2 + 0.6 + techIndex * 0.1}
                    as="span"
                    className={`inline-block mr-2 mb-2 px-3 py-1 text-xs rounded-full ${
                      tech === "React"
                        ? "bg-blue-600 text-white"
                        : tech === "Three.js" ||
                          tech === "WebGL" ||
                          tech === "GLSL" ||
                          tech === "WASD Controls"
                        ? "bg-green-600 text-white"
                        : tech === "CSS Animation" || tech === "JavaScript"
                        ? "bg-purple-600 text-white"
                        : "bg-orange-600 text-white"
                    }`}
                  >
                    {tech}
                  </TextAnimation>
                ))}
              </div>

              <div className="mt-2 text-sm text-blue-400 hover:text-blue-300">
                클릭하여 자세히 보기 →
              </div>
            </div>
          ))}
        </div>

        {/* 기타 프로젝트 카드 그리드 */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-6 text-white">기타 프로젝트</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {otherProjects.map((proj, idx) => (
              <div
                key={proj.id}
                className="bg-gray-700/80 rounded-xl p-5 text-white shadow hover:bg-gray-600/90 hover:scale-105 transition cursor-pointer min-h-[90px] flex flex-col justify-between"
                onClick={() => navigate(proj.path)}
              >
                <TextAnimation
                  preset="fade"
                  unit="word"
                  delay={idx * 0.1}
                  stagger={0.1}
                  as="span"
                  className="text-base font-semibold mb-2"
                >
                  {proj.title}
                </TextAnimation>
                <span
                  className={`mt-2 px-2 py-0.5 rounded text-xs font-normal self-end ${tagColor(
                    proj.tag
                  )} text-white`}
                >
                  {proj.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
