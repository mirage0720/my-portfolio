import React from "react";
import BackButton from "../../components/common/BackButton";

const VocabularyLearningPlatform = () => (
  <section className="py-20 px-4 md:px-12 bg-gray-900 text-white min-h-screen">
    <BackButton to={-1} />

    {/* 프로젝트 타이틀 */}
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-5xl">🎓</div>
        <div>
          <h1 className="text-4xl font-bold mb-2">영단어 학습 플랫폼 VOCADO</h1>
          <p className="text-lg text-gray-300">
            시각적 보카맵과 게임화를 통한 혁신적인 영단어 학습 시스템
          </p>
        </div>
      </div>
    </div>

    <div className="max-w-4xl mx-auto space-y-12">
      {/* 프로젝트 개요 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-400">
          📋 프로젝트 개요
        </h2>
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-200 leading-relaxed mb-4">
            고등학생을 위한 체계적인 영단어 학습 플랫폼으로, 전통적인 암기
            방식을 넘어
            <strong className="text-blue-400">
              {" "}
              시각적 의미 연결망(보카맵)
            </strong>
            과<strong className="text-green-400"> 게임화 요소</strong>를
            도입하여 효과적이고 재미있는 학습 경험을 제공합니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-900/50 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">📚</div>
              <div className="font-semibold">DAY 1-20</div>
              <div className="text-sm text-gray-300">체계적 학습 과정</div>
            </div>
            <div className="bg-green-900/50 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🗺️</div>
              <div className="font-semibold">시각적 보카맵</div>
              <div className="text-sm text-gray-300">단어 연결망 생성</div>
            </div>
            <div className="bg-purple-900/50 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">🎮</div>
              <div className="font-semibold">게임화 학습</div>
              <div className="text-sm text-gray-300">블라스트 게임</div>
            </div>
          </div>
        </div>
      </section>

      {/* 핵심 기능 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-green-400">
          ⚡ 핵심 기능
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-400">
              🎯 3단계 학습 시스템
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <strong>1단계:</strong> 단어 암기 (카드 펼치기 방식)
              </li>
              <li>
                <strong>2단계:</strong> 보카맵 생성 (단어 연결망)
              </li>
              <li>
                <strong>3단계:</strong> 실력 테스트 (4지선다)
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-purple-400">
              🗺️ 시각적 보카맵
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• 드래그 앤 드롭으로 단어 배치</li>
              <li>• 의미적 연관 단어들을 선으로 연결</li>
              <li>• 실시간 위치 이동 및 수정 가능</li>
              <li>• 틀린 단어는 빨간 점으로 표시</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              🎮 게임화 요소
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• 블라스트 게임 (소행성 파괴)</li>
              <li>• 연속 출석일 추적</li>
              <li>• 학습 진도율 시각화</li>
              <li>• 성취도 기반 피드백</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-red-400">
              🧠 적응형 학습
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• 틀린 단어 자동 추적</li>
              <li>• 개인별 취약점 분석</li>
              <li>• 맞춤형 복습 제공</li>
              <li>• 숙련도 레벨 관리</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 기술 스택 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-orange-400">
          🛠️ 기술 스택
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-blue-400">
              Frontend
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                React.js
              </span>
              <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">
                React Router
              </span>
              <span className="bg-cyan-600 px-3 py-1 rounded-full text-sm">
                Tailwind CSS
              </span>
              <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
                HTML5 Canvas
              </span>
              <span className="bg-yellow-600 px-3 py-1 rounded-full text-sm">
                Custom Hooks
              </span>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-green-400">
              Backend
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-700 px-3 py-1 rounded-full text-sm">
                Django
              </span>
              <span className="bg-blue-700 px-3 py-1 rounded-full text-sm">
                Django REST Framework
              </span>
              <span className="bg-gray-600 px-3 py-1 rounded-full text-sm">
                SQLite
              </span>
              <span className="bg-orange-600 px-3 py-1 rounded-full text-sm">
                Token Authentication
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 도전과제와 해결책 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-red-400">
          🎯 주요 도전과제와 해결책
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-400 mb-2">
              도전: 복잡한 캔버스 상태 관리
            </h3>
            <p className="text-gray-300 mb-2">
              <strong>문제:</strong> 수백 개의 단어 노드와 연결선을 실시간으로
              관리하며 성능 유지
            </p>
            <p className="text-gray-300">
              <strong>해결:</strong> React 커스텀 훅으로 상태를 모듈화하고,
              디바운스 저장으로 성능 최적화
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-green-500">
            <h3 className="font-semibold text-green-400 mb-2">
              도전: 좌표계 변환 문제
            </h3>
            <p className="text-gray-300 mb-2">
              <strong>문제:</strong> 줌/팬 기능으로 인한 마우스 좌표와 캔버스
              좌표 불일치
            </p>
            <p className="text-gray-300">
              <strong>해결:</strong> 정확한 좌표 변환 공식 적용 및 실시간 디버깅
              시스템 구축
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-semibold text-purple-400 mb-2">
              도전: 학습 데이터 일관성
            </h3>
            <p className="text-gray-300 mb-2">
              <strong>문제:</strong> 퀴즈 결과와 보카맵 상태 간의 실시간 동기화
            </p>
            <p className="text-gray-300">
              <strong>해결:</strong> 통합 API 설계로 단일 진실 공급원(Single
              Source of Truth) 구현
            </p>
          </div>
        </div>
      </section>

      {/* 성과 및 결과 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
          🏆 성과 및 학습 포인트
        </h2>
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-400 mb-3">
                ✅ 주요 성과
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• 복잡한 상태 관리 시스템 구축</li>
                <li>• 실시간 데이터 동기화 구현</li>
                <li>• 직관적인 UI/UX 디자인</li>
                <li>• 확장 가능한 아키텍처 설계</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-400 mb-3">
                📚 학습한 기술
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• React 고급 패턴 (Custom Hooks, Context)</li>
                <li>• Canvas API를 활용한 시각화</li>
                <li>• REST API 설계 및 최적화</li>
                <li>• 복잡한 비즈니스 로직 모델링</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 프로젝트 링크 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-cyan-400">
          🔗 프로젝트 바로가기
        </h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/mirage0720?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.38 7.87 10.89.58.1.79-.25.79-.56v-2.03c-3.2.7-3.87-1.54-3.87-1.54-.53-1.35-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.8 1.2 1.8 1.2 1.04 1.8 2.74 1.28 3.41.98.11-.75.41-1.28.75-1.58-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.44.11-3 0 0 .98-.31 3.21 1.18A11.07 11.07 0 0 1 12 6.84c.99.01 1.99.13 2.93.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.56.23 2.71.11 3 .74.8 1.18 1.83 1.18 3.09 0 4.43-2.71 5.41-5.28 5.7.42.37.8 1.1.8 2.22v3.29c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.87 18.13.5 12 .5Z"
                clipRule="evenodd"
              />
            </svg>
            <span>Frontend Repository</span>
          </a>

          <a
            href="https://github.com/mirage0720?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.38 7.87 10.89.58.1.79-.25.79-.56v-2.03c-3.2.7-3.87-1.54-3.87-1.54-.53-1.35-1.3-1.7-1.3-1.7-1.06-.72.08-.7.08-.7 1.17.08 1.8 1.2 1.8 1.2 1.04 1.8 2.74 1.28 3.41.98.11-.75.41-1.28.75-1.58-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.44.11-3 0 0 .98-.31 3.21 1.18A11.07 11.07 0 0 1 12 6.84c.99.01 1.99.13 2.93.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.56.23 2.71.11 3 .74.8 1.18 1.83 1.18 3.09 0 4.43-2.71 5.41-5.28 5.7.42.37.8 1.1.8 2.22v3.29c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.87 18.13.5 12 .5Z"
                clipRule="evenodd"
              />
            </svg>
            <span>Backend Repository</span>
          </a>

          <a
            href="https://www.notion.so/301fbf65f350476391bc88eeed8192c9?v=49a034076ee34b71bf84727f8be36c0f"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105"
          >
            <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="24" height="24" rx="5" fill="white" />
              <path
                d="M12 12V20M12 20L14.5 12M12 20H15M18 20V12H20C21.1 12 22 12.9 22 14V18C22 19.1 21.1 20 20 20H18Z"
                stroke="black"
                strokeWidth="1.5"
              />
            </svg>
            <span>프로젝트 문서</span>
          </a>
        </div>
      </section>
    </div>
  </section>
);

export default VocabularyLearningPlatform;
