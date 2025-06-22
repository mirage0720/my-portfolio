import React, { useState, useEffect, useRef } from "react";
import { Send, Hash, Bot, Home } from "lucide-react";
import BackButton from "../../components/common/BackButton";

const ChatMessenger = () => {
  const [showNotification, setShowNotification] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "유동원",
      content:
        "안녕하세요! 👋 저는 프론트엔드 개발자 유동원입니다. 저에 대해 궁금한 것이 있으시면 언제든 물어보세요!",
      timestamp: new Date(Date.now() - 300000),
      avatar: "👨‍💻",
      isBot: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [currentUser] = useState("방문자");
  const [typingUsers, setTypingUsers] = useState([]);
  const [activeChannel, setActiveChannel] = useState("interview");
  const messagesEndRef = useRef(null);

  const channels = [
    { name: "interview", icon: Hash },
    { name: "portfolio", icon: Hash },
    { name: "experience", icon: Hash },
  ];

  const onlineUsers = [
    { name: "유동원", status: "online", avatar: "👨‍💻" },
    { name: "방문자", status: "online", avatar: "👤" },
  ];

  // 개인 정보 데이터베이스
  const personalInfo = {
    basic: {
      name: "유동원",
      age: 31,
      location: "서울시 성북구",
      email: "youdw1994@gmail.com",
      phone: "010-6697-7917",
    },
    education: {
      university: "대진대학교 국제학부 미국학과",
      graduation: "2023년 2월 수료",
      gpa: "3.3/4.5",
    },
    military: {
      service: "육군 병장 (운전병)",
      period: "2015.08 ~ 2017.05",
      overseas: "레바논 파병 (UN 평화유지군, 2016.08~2017.04)",
    },
    career: [
      {
        company: "알고소프트",
        period: "2024.07 ~ 2024.10",
        position: "개발 사원",
        role: "웹 게임 및 프론트엔드 개발",
      },
      {
        company: "천재교육",
        period: "2025.05 ~ 2025.08",
        position: "TA 인턴",
        role: "교육 지원",
      },
    ],
    education_courses: [
      {
        name: "백엔드 개발자 취업캠프(Java)",
        institution: "멀티캠퍼스",
        period: "2023.02 ~ 2023.07",
      },
      {
        name: "클라우드 기반 AI 챗봇 개발 마스터 과정",
        institution: "서울경제진흥원(새싹캠퍼스)",
        period: "2024.10 ~ 2025.02",
      },
      {
        name: "AWS AI 관련 과정 3개",
        institution: "AWS",
        period: "2024.12",
      },
    ],
    skills: {
      frontend: [
        "HTML",
        "CSS",
        "JavaScript",
        "Vanilla JS",
        "Canvas",
        "Three.js",
      ],
      backend: ["Java", "Spring", "MVC 아키텍처"],
      ai: ["Python", "데이터 전처리", "ML/DL", "OpenAI API", "RAG", "Agent"],
      tools: ["Unity", "C#", "AWS", "웹소켓", "아고라 API"],
      languages: ["영어 (TOEIC 상급)", "한국어 (모국어)"],
    },
    projects: [
      {
        name: "소모임 웹사이트 제작 프로젝트",
        result: "1등 수상",
        description: "Java와 Spring을 활용한 웹사이트 개발",
      },
      {
        name: "홀덤 카드 게임",
        tech: ["Vanilla JavaScript", "Canvas", "Three.js"],
        description: "실제 카드 뒤집는 모션 구현으로 사실적인 게임 경험 제공",
        feedback: "프로 포커 선수로부터 실제 현장 느낌이라는 긍정적 피드백",
      },
      {
        name: "실시간 채팅 및 영상통화 시스템",
        tech: ["웹소켓", "아고라 API"],
        description: "실시간 소통 기능 구현",
      },
      {
        name: "AI 챗봇 개발",
        tech: ["Python", "AWS", "OpenAI API", "RAG", "Agent"],
        description: "LLM의 단점을 보완한 고도화된 챗봇 제작",
      },
    ],
    strengths: [
      "문제 해결력: 체계적 원인 분석과 최적 솔루션 도출",
      "유저 중심 사고: 사용자 경험과 편의성을 최우선으로 고려",
      "기술 학습 능력: 새로운 기술과 프레임워크 빠른 습득",
      "창의적 구현: Three.js를 활용한 혁신적 인터랙션 개발",
      "AI 활용 역량: 최신 AI 기술을 실무에 적용하는 능력",
    ],
    goals: [
      "Interactive Motion 시스템 구축",
      "마이크로 인터랙션 체계화",
      "사용자 중심의 컴포넌트 설계",
      "디자인과 개발 간극 해소",
      "혁신적인 사용자 경험 제공",
    ],
  };

  // 질문 패턴 매칭 및 응답 생성
  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // 인사말
    if (
      message.includes("안녕") ||
      message.includes("hello") ||
      message.includes("hi")
    ) {
      return "안녕하세요! 만나서 반갑습니다 😊 저에 대해 궁금한 것이 있으시면 언제든 물어보세요!";
    }

    // 기본 정보
    if (message.includes("이름") || message.includes("누구")) {
      return `저는 ${personalInfo.basic.name}입니다. ${personalInfo.basic.age}세 프론트엔드 개발자로, 현재 ${personalInfo.basic.location}에 거주하고 있습니다.`;
    }

    if (message.includes("나이") || message.includes("몇살")) {
      return `저는 1994년생으로 만 ${personalInfo.basic.age}세입니다.`;
    }

    if (
      message.includes("연락처") ||
      message.includes("이메일") ||
      message.includes("전화")
    ) {
      return `연락처는 ${personalInfo.basic.phone}이고, 이메일은 ${personalInfo.basic.email}입니다.`;
    }

    // 학력
    if (
      message.includes("학력") ||
      message.includes("대학") ||
      message.includes("전공")
    ) {
      return `${personalInfo.education.university}를 ${personalInfo.education.graduation}에 수료했습니다. 학점은 ${personalInfo.education.gpa}입니다.`;
    }

    // 병역
    if (
      message.includes("군대") ||
      message.includes("병역") ||
      message.includes("파병")
    ) {
      return `${personalInfo.military.period} 동안 ${personalInfo.military.service}으로 복무했습니다. 특히 ${personalInfo.military.overseas} 경험이 있어서, 이때 프로그래밍 로봇을 보고 개발에 관심을 갖게 되었습니다.`;
    }

    // 경력
    if (
      message.includes("경력") ||
      message.includes("회사") ||
      message.includes("직장")
    ) {
      const careerInfo = personalInfo.career
        .map(
          (job) =>
            `${job.company}에서 ${job.period} 동안 ${job.position}으로 ${job.role}을 담당했습니다.`
        )
        .join(" ");
      return `제 경력사항입니다: ${careerInfo}`;
    }

    if (message.includes("알고소프트")) {
      const algosoft = personalInfo.career[0];
      return `${algosoft.company}에서 ${algosoft.period} 동안 ${algosoft.role}을 담당했습니다. 웹소켓과 아고라 API를 활용한 실시간 채팅 및 영상통화 기능을 구현했어요.`;
    }

    // 기술 스택
    if (
      message.includes("기술") ||
      message.includes("스킬") ||
      message.includes("언어") ||
      message.includes("프로그래밍")
    ) {
      return `주요 기술 스택입니다:
프론트엔드: ${personalInfo.skills.frontend.join(", ")}
백엔드: ${personalInfo.skills.backend.join(", ")}
AI: ${personalInfo.skills.ai.join(", ")}
기타 도구: ${personalInfo.skills.tools.join(", ")}
특히 Three.js를 활용한 3D 인터랙션과 AI 기술 활용에 강점이 있습니다.`;
    }

    if (
      message.includes("자바스크립트") ||
      message.includes("javascript") ||
      message.includes("js")
    ) {
      return "JavaScript는 제가 가장 자신 있는 언어 중 하나입니다! Vanilla JS부터 시작해서 Canvas와 Three.js를 활용한 3D 게임 개발까지 경험했어요. 특히 홀덤 게임에서 실제 카드 뒤집는 모션을 구현했을 때 정말 보람을 느꼈습니다.";
    }

    if (message.includes("react") || message.includes("리액트")) {
      return "React도 사용할 수 있습니다! 현재 컴포넌트 기반 설계와 사용자 중심의 인터랙션 개발에 관심이 많아서 React의 컴포넌트 철학과 잘 맞는다고 생각해요.";
    }

    if (
      message.includes("ai") ||
      message.includes("인공지능") ||
      message.includes("챗봇")
    ) {
      return `AI 분야에 특별한 관심이 있습니다! 서울경제진흥원 새싹캠퍼스에서 AI 교육을 받았고, Python으로 데이터 전처리부터 ML/DL까지 학습했어요. AWS에서 OpenAI API를 활용한 챗봇도 개발했고, RAG와 Agent를 통해 LLM의 한계를 보완하는 작업도 해봤습니다.`;
    }

    // 프로젝트
    if (message.includes("프로젝트") || message.includes("포트폴리오")) {
      const projects = personalInfo.projects
        .map((project) => `• ${project.name}: ${project.description}`)
        .join("\n");
      return `주요 프로젝트들입니다:\n${projects}`;
    }

    if (
      message.includes("홀덤") ||
      message.includes("게임") ||
      message.includes("카드")
    ) {
      const holdem = personalInfo.projects[1];
      return `${
        holdem.name
      }이 가장 기억에 남는 프로젝트입니다! ${holdem.tech.join(
        ", "
      )}를 사용해서 ${holdem.description}했어요. ${
        holdem.feedback
      }을 받았을 때 정말 뿌듯했습니다. 기술적 구현을 넘어 사용자가 느끼는 감정까지 고려한 개발의 중요성을 깨달았습니다.`;
    }

    // 강점
    if (
      message.includes("강점") ||
      message.includes("장점") ||
      message.includes("특기")
    ) {
      return `제 주요 강점들입니다:
${personalInfo.strengths.map((strength) => `• ${strength}`).join("\n")}
특히 사용자 관점에서 생각하고 기술과 감정을 연결하는 개발을 지향합니다.`;
    }

    if (
      message.includes("문제해결") ||
      message.includes("버그") ||
      message.includes("디버깅")
    ) {
      return "문제 해결이 제 가장 큰 강점입니다! 새로운 버그나 문제를 마주하면 체계적으로 원인을 분석하고, 공식 문서나 최신 자료를 활용해 해결책을 찾아내요. 알고소프트에서 소개팅 앱 고도화 과제를 맡았을 때도 유저 이탈률 데이터를 분석해서 게임 요소를 결합한 혁신적인 솔루션을 제안했습니다.";
    }

    // 목표/포부
    if (
      message.includes("목표") ||
      message.includes("포부") ||
      message.includes("계획") ||
      message.includes("미래")
    ) {
      return `앞으로의 목표입니다:
${personalInfo.goals.map((goal) => `• ${goal}`).join("\n")}
사용자가 '이 서비스는 정말 다르다'고 느낄 수 있는 경험을 만들고 싶습니다.`;
    }

    // 교육
    if (
      message.includes("교육") ||
      message.includes("캠프") ||
      message.includes("과정")
    ) {
      const courses = personalInfo.education_courses
        .map(
          (course) =>
            `• ${course.name} (${course.institution}, ${course.period})`
        )
        .join("\n");
      return `이수한 교육과정들입니다:\n${courses}`;
    }

    // 왜 개발자가 되었는지
    if (
      message.includes("왜") ||
      message.includes("계기") ||
      message.includes("시작")
    ) {
      return "군 복무 중 UN 평화유지군으로 레바논에 파병 갔을 때, UN군 행사에서 프로그래밍으로 폭발물을 처리하는 로봇을 보고 코딩에 흥미를 갖게 되었습니다. 단순한 관심에서 끝나지 않고 실질적인 역량을 기르기 위해 KDT 과정에 도전했고, 지금까지 이어져 오고 있어요.";
    }

    // 협업
    if (
      message.includes("협업") ||
      message.includes("팀워크") ||
      message.includes("소통")
    ) {
      return "협업을 매우 중요하게 생각합니다! 디자인과 개발 사이의 간극을 줄이고, 팀 전체가 활용할 수 있는 컴포넌트 시스템을 만드는 것이 목표예요. 실제로 알고소프트에서도 동료들과의 신뢰 관계를 바탕으로 좋은 성과를 낼 수 있었습니다.";
    }

    // 기본 응답
    const responses = [
      "흥미로운 질문이네요! 더 구체적으로 어떤 부분이 궁금하신지 알려주시면 자세히 답변드릴게요.",
      "좋은 질문입니다! 제 경력, 기술 스택, 프로젝트, 목표 등 어떤 것이든 물어보세요.",
      "저에 대해 관심을 가져주셔서 감사합니다! 특히 어떤 분야가 궁금하신가요?",
      "더 자세한 내용을 원하시면 '기술 스택', '프로젝트', '경력', '목표' 등으로 질문해보세요!",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 메시지 전송
  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        user: currentUser,
        content: newMessage,
        timestamp: new Date(),
        avatar: "👤",
        isBot: false,
      };

      setMessages((prev) => [...prev, userMessage]);
      const currentMessage = newMessage;
      setNewMessage("");

      // 타이핑 시뮬레이션
      setTypingUsers(["유동원"]);

      // AI 응답 생성
      setTimeout(() => {
        setTypingUsers([]);
        const response = generateResponse(currentMessage);

        const botMessage = {
          id: Date.now() + 1,
          user: "유동원",
          content: response,
          timestamp: new Date(),
          avatar: "👨‍💻",
          isBot: true,
        };

        setMessages((prev) => [...prev, botMessage]);
      }, 1500 + Math.random() * 1000);
    }
  };

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(timestamp);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex h-screen bg-gray-800 text-white relative">
      {/* 알림 팝업 */}
      {showNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-gray-800 rounded-lg p-6 max-w-md mx-4 shadow-xl">
            <h3 className="text-lg font-bold mb-3 text-center">
              👨‍💻 개발자 소개
            </h3>
            <div className="space-y-3 text-sm">
              <p>
                안녕하세요! <strong>프론트엔드 개발자 유동원</strong>의 개인
                소개 챗봇입니다.
              </p>
              <p>
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                저의 경력, 기술 스택, 프로젝트에 대해 질문해보세요
              </p>
              <p>
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                실제 이력서 데이터 기반으로 개인화된 답변 제공
              </p>
              <p>
                <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                자연스러운 대화형 인터페이스로 정보 탐색
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowNotification(false)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                대화 시작하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 서버/채널 사이드바 */}
      <div className="w-16 bg-gray-900 flex flex-col items-center py-3 space-y-2">
        <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-xl font-bold hover:rounded-xl transition-all cursor-pointer">
          유
        </div>
        <div className="w-8 h-px bg-gray-600"></div>
        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:rounded-xl transition-all cursor-pointer">
          💼
        </div>
        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:rounded-xl transition-all cursor-pointer">
          🚀
        </div>
      </div>

      {/* 채널 사이드바 */}
      <div className="w-60 bg-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-600">
          <h1 className="font-bold text-lg">유동원 포트폴리오</h1>
        </div>

        <div className="flex-1 p-2">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              대화 주제
            </h3>
            <div className="space-y-1">
              {channels.map((channel) => (
                <div
                  key={channel.name}
                  onClick={() => setActiveChannel(channel.name)}
                  className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                    activeChannel === channel.name
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-600 hover:text-white"
                  }`}
                >
                  <channel.icon className="w-4 h-4 mr-2" />
                  {channel.name}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-3 mb-4">
            <h4 className="text-sm font-medium mb-2 text-indigo-300">
              💡 질문 예시
            </h4>
            <div className="text-xs text-gray-400 space-y-1">
              <div>• "기술 스택이 어떻게 되나요?"</div>
              <div>• "어떤 프로젝트를 했나요?"</div>
              <div>• "왜 개발자가 되었나요?"</div>
              <div>• "AI 경험이 있나요?"</div>
              <div>• "협업은 어떻게 하나요?"</div>
            </div>
          </div>
        </div>

        {/* 사용자 정보 */}
        <div className="p-2 bg-gray-800 flex items-center">
          <div className="relative">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm">
              👤
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
          </div>
          <div className="ml-2 flex-1">
            <div className="text-sm font-medium">방문자</div>
            <div className="text-xs text-gray-400">온라인</div>
          </div>
          <div className="flex space-x-1">
            <button className="p-1 hover:bg-gray-700 rounded">
              <Bot className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 메인 채팅 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 채널 헤더 */}
        <div className="p-4 border-b border-gray-600 flex items-center justify-between">
          <div className="flex items-center">
            <Hash className="w-5 h-5 mr-2 text-gray-400" />
            <span className="font-semibold">#{activeChannel}</span>
            <div className="ml-4 text-sm text-gray-400">
              프론트엔드 개발자 유동원과의 대화
            </div>
          </div>

          {/* 뒤로가기 버튼 */}
          <BackButton
            to={-1}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            홈으로 돌아가기
          </BackButton>
        </div>

        {/* 메시지 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex items-start space-x-3 hover:bg-gray-700 hover:bg-opacity-30 p-2 rounded group"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-lg">
                {message.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline space-x-2">
                  <span
                    className={`font-medium ${
                      message.isBot ? "text-indigo-300" : "text-white"
                    }`}
                  >
                    {message.user}
                  </span>
                  {message.isBot && (
                    <span className="text-xs bg-indigo-600 px-2 py-1 rounded text-white">
                      개발자
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <p className="text-gray-300 mt-1 break-words whitespace-pre-line">
                  {message.content}
                </p>
              </div>
            </div>
          ))}

          {/* 타이핑 표시 */}
          {typingUsers.length > 0 && (
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span>{typingUsers.join(", ")}님이 답변을 준비 중...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 메시지 입력 */}
        <div className="p-4">
          <form onSubmit={sendMessage} className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="유동원에게 궁금한 것을 물어보세요..."
                className="w-full p-3 bg-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="p-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* 사용자 목록 */}
      <div className="w-60 bg-gray-700 p-4">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            온라인 — {onlineUsers.filter((u) => u.status === "online").length}명
          </h3>
          <div className="space-y-2">
            {onlineUsers
              .filter((user) => user.status === "online")
              .map((user) => (
                <div
                  key={user.name}
                  className="flex items-center space-x-3 p-2 rounded hover:bg-gray-600 cursor-pointer"
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm">
                      {user.avatar}
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(
                        user.status
                      )} rounded-full border-2 border-gray-700`}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-300">{user.name}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessenger;
