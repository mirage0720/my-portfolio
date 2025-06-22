// src/sections/ContactSection.jsx
import React, { useState } from "react";
import TextAnimation from "../common/TextAnimation";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText("youdw1994@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

  const handleGitHubClick = () => {
    window.open("https://github.com/mirage0720", "_blank");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-6 text-center">
        {/* 헤더 고정 크기 적용 */}
        <TextAnimation
          preset="slide"
          unit="word"
          stagger={0.15}
          as="h2"
          className="text-4xl font-bold mb-16"
        >
          연락하기
        </TextAnimation>

        {/* 단락은 기존 크기 유지 */}
        <TextAnimation
          preset="fade"
          unit="character"
          delay={0.2}
          as="p"
          className="text-2xl text-gray-300 mb-12"
        >
          궁금한 점이나 제안이 있으시다면 언제든 연락해 주세요.
        </TextAnimation>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
          <span
            onClick={handleEmailClick}
            className="text-blue-400 hover:text-blue-300 text-xl font-semibold cursor-pointer transition-colors underline hover:underline"
          >
            {copied ? "복사됨!" : "📧 이메일"}
          </span>

          <span
            onClick={handleGitHubClick}
            className="text-gray-300 hover:text-white text-xl font-semibold cursor-pointer transition-colors underline hover:underline"
          >
            🔗 GitHub
          </span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
