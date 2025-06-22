import React from "react";
import BackButton from "../../components/common/BackButton";

const UnityGame = () => (
  <section className="py-20 px-4 md:px-12 bg-gray-900 text-white min-h-screen">
    <BackButton to={-1} />

    {/* 프로젝트 타이틀 */}
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Unity 활용 3D 게임 제작</h1>
      <p className="text-lg text-gray-300 mb-8">
        Unity 엔진을 활용한 게임 프로젝트
      </p>
    </div>

    <div className="max-w-3xl mx-auto space-y-10">
      {/* 개요 */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">프로젝트 개요</h2>
        <p className="text-gray-200 leading-relaxed">
          Unity와 C#을 기반으로 게임을 개발했습니다. <br />
          다양한 게임 오브젝트와 물리 엔진을 활용해 몰입감 있는 플레이 경험을
          제공하며, 멀티플레이 네트워크 환경도 직접 구현하였습니다.
        </p>
      </section>

      {/* 주요 기능 */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">주요 기능</h2>
        <ul className="list-disc list-inside text-gray-200 space-y-1">
          <li>2D/3D 게임 맵 및 캐릭터 구현</li>
          <li>실시간 멀티플레이 매칭</li>
          <li>충돌 판정 및 물리엔진 활용</li>
          <li>UI/UX 인터페이스</li>
          <li>모바일 및 PC 크로스플랫폼 지원</li>
        </ul>
      </section>

      {/* 사용 기술 */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">사용 기술</h2>
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-700/50 px-3 py-1 rounded-full">Unity</span>
          <span className="bg-green-700/50 px-3 py-1 rounded-full">C#</span>
          <span className="bg-gray-700/50 px-3 py-1 rounded-full">Blender</span>
        </div>
      </section>

      {/* 담당 역할 */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">담당 역할</h2>
        <ul className="list-disc list-inside text-gray-200 space-y-1">
          <li>3D 모델링 및 씬 구성</li>
          <li>플레이어 컨트롤/카메라 시스템 개발</li>
          <li>네트워크(멀티플레이) 기능 구현</li>
          <li>UI 디자인 및 구현</li>
        </ul>
      </section>

      {/* 결과/성과 */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">성과 및 배운 점</h2>
        <ul className="list-disc list-inside text-gray-200 space-y-1">
          <li>실시간 네트워크 게임 구조와 최적화 경험 습득</li>
          <li>게임 기획, 개발, 배포까지 전체 파이프라인 직접 경험</li>
          <li>물리 엔진 활용 중 발생한 버그를 직접 해결하며 문제해결력 강화</li>
          <li>3D 모델링 및 멀티플레이 구현 실전 역량 향상</li>
        </ul>
      </section>

      {/* 프로젝트 외부 링크 섹션 (예시, 필요시 추가) */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">프로젝트 바로가기</h2>
        <div className="flex flex-row gap-4">
          {/* Github 버튼 */}
          <a
            href="https://github.com/mirage0720?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            {/* Github SVG */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.38 7.87 10.89.58.1.79-.25.79-.56v-2.03c-3.2.7-3.87-1.54-3.87-1.54-.53-1.35-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.8 1.2 1.8 1.2 1.04 1.8 2.74 1.28 3.41.98.11-.75.41-1.28.75-1.58-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.44.11-3 0 0 .98-.31 3.21 1.18A11.07 11.07 0 0 1 12 6.84c.99.01 1.99.13 2.93.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.56.23 2.71.11 3 .74.8 1.18 1.83 1.18 3.09 0 4.43-2.71 5.41-5.28 5.7.42.37.8 1.1.8 2.22v3.29c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.87 18.13.5 12 .5Z"
                clipRule="evenodd"
              />
            </svg>
            <span>GitHub</span>
          </a>
          {/* Notion 버튼 */}
          <a
            href="https://www.notion.so/301fbf65f350476391bc88eeed8192c9?v=49a034076ee34b71bf84727f8be36c0f"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            {/* Notion SVG */}
            <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="24" height="24" rx="5" fill="white" />
              <path
                d="M12 12V20M12 20L14.5 12M12 20H15M18 20V12H20C21.1 12 22 12.9 22 14V18C22 19.1 21.1 20 20 20H18Z"
                stroke="black"
                strokeWidth="1.5"
              />
            </svg>
            <span>Notion</span>
          </a>
        </div>
      </section>
    </div>
  </section>
);

export default UnityGame;
