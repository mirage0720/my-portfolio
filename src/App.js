import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ResumePage from "./pages/ResumePage";

import ProjectsListPage from "./pages/projects/ProjectsListPage";
import Character3D from "./pages/projects/Character3D";
import DinoGame from "./pages/projects/DinoGame";
import ChatMessenger from "./pages/projects/ChatMessenger";

import AIChatbot from "./pages/projects/AIChatbot";
import ResponsiveSite from "./pages/projects/ResponsiveSite";
import UnityGame from "./pages/projects/UnityGame";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 홈 */}
          <Route path="/" element={<Home />} />

          {/* 통합 이력서 페이지 */}
          <Route path="/resume" element={<ResumePage />} />

          {/* 프로젝트 관련 */}
          <Route path="/projects" element={<ProjectsListPage />} />
          <Route path="/projects/3d-character" element={<Character3D />} />
          <Route path="/projects/chat-messenger" element={<ChatMessenger />} />
          <Route path="/projects/dino-game" element={<DinoGame />} />
          <Route path="/projects/ai-chatbot" element={<AIChatbot />} />
          <Route
            path="/projects/responsive-site"
            element={<ResponsiveSite />}
          />
          <Route path="/projects/unity-game" element={<UnityGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
