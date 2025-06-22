import React from "react";

const awards = [
  {
    title: "클라우드 기반 AI 챗봇 개발 마스터 과정",
    org: "서울경제진흥원 새싹 캠퍼스",
    period: "2024.10",
    bullets: [
      "Python",
      "머신러닝",
      "딥러닝",
      "OpenAI API 활용 LLM/RAG/Agent 구현",
    ],
  },
  {
    title: "백엔드 개발자 취업캠프(Java)",
    org: "멀티잇(멀티캠퍼스)",
    period: "2023.03 ~ 2023.07",
    bullets: [
      "HTML/CSS/JavaScript",
      "SQL+DB 모델링",
      "Servlet & JSP",
      "MVC 아키텍처 구현",
    ],
  },
  {
    title: "레바논 평화유지군(UN 파병)",
    org: "UN/대한민국 육군",
    period: "2016.08 ~ 2017.04",
    bullets: ["UN 평화 유지 활동"],
  },
];

export default function AwardsSection() {
  return (
    <section className="py-20 px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white">🏆 수상 및 활동</h2>
        <div className="space-y-8">
          {awards.map((a, i) => (
            <div
              key={i}
              className="p-6 border border-gray-700 rounded-lg bg-gray-800"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-white">{a.title}</h3>
                <span className="text-gray-300">{a.period}</span>
              </div>
              <p className="italic mb-2 text-gray-300">{a.org}</p>
              <ul className="list-disc list-inside text-gray-300">
                {a.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
