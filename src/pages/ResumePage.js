import React, { useEffect } from "react";
import BackButton from "../components/common/BackButton";
import ExperienceSection from "../components/sections/ExperienceSection";
import AwardsSection from "../components/sections/AwardsSection";
import CertificationsSection from "../components/sections/CertificationsSection";

export default function ResumePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 이제 버튼이 fixed이므로 wrapper가 필요 없습니다 */}
      <BackButton to={-1} />

      <ExperienceSection />
      <AwardsSection />
      <CertificationsSection />
    </div>
  );
}
