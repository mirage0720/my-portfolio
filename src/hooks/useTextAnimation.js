import { useAnimation } from "framer-motion";

// Hook for programmatic control
export const useTextAnimation = () => {
  const controls = useAnimation();

  const playAnimation = async (preset = "fade", unit = "word") => {
    await controls.start("visible");
  };

  const resetAnimation = async () => {
    await controls.start("hidden");
  };

  return {
    controls,
    playAnimation,
    resetAnimation,
  };
};
