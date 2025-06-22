import React from "react";
import TextAnimation from "../../components/common/TextAnimation";

const otherProjects = [
  "AI 챗봇 개발",
  "반응형 웹사이트 제작",
  "Unity 활용 3D 게임 제작",
  // …원하는 만큼 추가
];

const ProjectsListPage = () => {
  return (
    <section className="py-20 px-8 bg-gray-800 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <TextAnimation
          preset="slide"
          unit="word"
          stagger={0.1}
          as="h2"
          className="text-3xl font-bold mb-12 text-white"
        >
          전체 프로젝트
        </TextAnimation>

        <ul className="text-gray-300 list-disc list-inside space-y-2">
          {otherProjects.map((title, idx) => (
            <li key={idx} className="pl-2">
              {title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProjectsListPage;
