import React from "react";

const experiences = [
  {
    company: "디지털러닝",
    position: "인턴/TA",
    period: "2025.05 ~ 재직 중",
    details: ["KDT 풀스택 과정 TA 직무 수행", "프로젝트/수업 질의응답 진행"],
  },
  {
    company: "알고소프트",
    position: "사원 · 웹 게임 개발",
    period: "2024.07 ~ 2024.10",
    details: [
      "Vue.js 기반 SPA 웹 게임 플랫폼 제작",
      "아고라 API 활용 영상통화 및 채팅 사이트 구현",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section className="py-20 px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white">💼 업무 경험</h2>
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="p-6 border border-gray-700 rounded-lg bg-gray-800"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-white">
                  {exp.company}
                </h3>
                <span className="text-gray-300">{exp.period}</span>
              </div>
              <p className="italic mb-2 text-gray-300">{exp.position}</p>
              <ul className="list-disc list-inside text-gray-300">
                {exp.details.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
