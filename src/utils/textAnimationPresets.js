// 기본 애니메이션 프리셋들
export const animationPresets = {
  fade: {
    character: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    word: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    line: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  },
  slide: {
    character: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    word: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    line: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
  },
  // 추가 프리셋들 (나중에 확장 가능)
  zoom: {
    character: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    word: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
    line: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
  },
  rotate: {
    character: {
      hidden: { opacity: 0, rotateX: -90 },
      visible: { opacity: 1, rotateX: 0 },
    },
    word: {
      hidden: { opacity: 0, rotateY: -90 },
      visible: { opacity: 1, rotateY: 0 },
    },
    line: {
      hidden: { opacity: 0, rotateX: -90 },
      visible: { opacity: 1, rotateX: 0 },
    },
  },
};

// 새로운 프리셋을 추가하는 함수
export const addPreset = (name, preset) => {
  animationPresets[name] = preset;
};

// 프리셋 목록을 가져오는 함수
export const getPresetNames = () => Object.keys(animationPresets);

// 특정 프리셋을 가져오는 함수
export const getPreset = (name, unit = "word") => {
  return animationPresets[name]?.[unit] || animationPresets.fade[unit];
};
