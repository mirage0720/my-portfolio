import React from "react";

const certs = [
  { title: "Generative AI on AWS (Korea ONLY)", org: "AWS", year: "2024" },
  {
    title: "AWS Generative AI Essentials (Korea ONLY)",
    org: "AWS",
    year: "2024",
  },
  {
    title: "Practical Data Science with Amazon SageMaker",
    org: "AWS",
    year: "2024",
  },
];

export default function CertificationsSection() {
  return (
    <section className="py-20 px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white">
          ✍️ 수료 및 자격증
        </h2>
        <div className="space-y-6">
          {certs.map((c, i) => (
            <div
              key={i}
              className="p-6 border border-gray-700 rounded-lg bg-gray-800 flex justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-white">{c.title}</h3>
                <p className="text-gray-300">{c.org}</p>
              </div>
              <span className="text-gray-300 self-center">{c.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
