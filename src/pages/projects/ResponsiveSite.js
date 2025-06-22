import React from "react";
import BackButton from "../../components/common/BackButton";

const ResponsiveSite = () => (
  <section className="py-20 px-4 md:px-12 bg-gray-900 text-white min-h-screen">
    {/* 뒤로가기 버튼 */}
    <BackButton to={-1} />

    {/* 프로젝트 타이틀 */}
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">반응형 웹사이트 제작</h1>
      <p className="text-lg text-gray-300 mb-8">
        다양한 기기에서 최적화된 반응형 웹사이트 개발 프로젝트
      </p>
    </div>

    {/* 프로젝트 설명 */}
    <div className="max-w-3xl mx-auto space-y-10">
      {/* 개요 */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">프로젝트 개요</h2>
        <p className="text-gray-200 leading-relaxed">
          React와 Tailwind CSS를 활용해 PC, 태블릿, 모바일 등 다양한 해상도에
          맞춰 자연스럽게 레이아웃이 변경되는 반응형 웹/앱을 개발했습니다.
          <br />
          효율적인 UI 설계와 접근성을 고려해 사용성을 극대화하는 것을 목표로
          했습니다.
        </p>
      </section>

      {/* 주요 기능 */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">주요 기능</h2>
        <ul className="list-disc list-inside text-gray-200 space-y-1">
          <li>모든 디바이스(PC, Tablet, Mobile) 대응 레이아웃</li>
          <li>사용자 친화적 네비게이션</li>
          <li>최적화된 성능 및 접근성</li>
        </ul>
      </section>

      {/* 사용 기술 */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">사용 기술</h2>
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-700/50 px-3 py-1 rounded-full">Vue.js</span>
          <span className="bg-cyan-700/50 px-3 py-1 rounded-full">
            JavaScript
          </span>
          <span className="bg-purple-700/50 px-3 py-1 rounded-full">PHP</span>
          <span className="bg-pink-700/50 px-3 py-1 rounded-full">Laravel</span>
        </div>
      </section>

      {/* 담당 역할 */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">담당 역할</h2>
        <ul className="list-disc list-inside text-gray-200 space-y-1">
          <li>UI/UX 설계 및 컴포넌트 개발</li>
          <li>반응형 스타일링 및 동적 데이터 랜더링</li>
          <li>아고라 API를 활용한 영상채팅 구현</li>
        </ul>
      </section>

      {/* 결과/성과 */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">성과 및 배운 점</h2>
        <ul className="list-disc list-inside text-gray-200 space-y-1">
          <li>다양한 환경에서 직접 테스트하며 반응형 UI 개발 실무 역량 강화</li>
          <li>접근성과 사용자 경험(UX)을 최우선으로 고려하는 개발 습관 형성</li>
          <li>효율적인 스타일 관리와 유지보수 노하우 습득</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">프로젝트 바로가기</h2>
        <div className="flex flex-row gap-4">
          <a
            href="https://play.google.com/store/apps/details?id=com.jnjsolohell.solohell&gl=kr&referrer=utm_source%3Dasospy.com%26utm_medium%3Dapi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-600 transition font-semibold"
          >
            웹사이트 바로가기
          </a>
        </div>
      </section>
    </div>
  </section>
);

export default ResponsiveSite;
