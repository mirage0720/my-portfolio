import React from "react";
import TextAnimation from "../common/TextAnimation";

const HeroSection = () => {
  return (
    <section className="flex items-center justify-center min-h-screen px-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <TextAnimation
          preset="fade"
          unit="character"
          stagger={0.05}
          as="h1"
          className="text-5xl md:text-7xl font-bold"
        >
          안녕하세요
        </TextAnimation>

        <TextAnimation
          preset="slide"
          unit="word"
          delay={1}
          stagger={0.1}
          as="h2"
          className="text-2xl md:text-3xl text-gray-300"
        >
          사용자 경험을 최우선으로 생각하는 개발자 유동원 입니다
        </TextAnimation>

        <TextAnimation
          preset="fade"
          unit="word"
          delay={2}
          stagger={0.08}
          as="p"
          className="text-lg text-gray-400 max-w-2xl mx-auto"
        >
          React와 Three.js를 활용하여 창의적이고 인터랙티브한 웹 경험을
          만들어갑니다
        </TextAnimation>
      </div>
    </section>
  );
};

export default HeroSection;
