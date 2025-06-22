import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

// 애니메이션 프리셋 정의
const animationPresets = {
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
};

// 텍스트를 단위별로 분할하는 유틸리티 함수
const splitText = (text, unit) => {
  switch (unit) {
    case "character":
      return text.split("").map((char, index) => ({
        content: char === " " ? "\u00A0" : char,
        key: `char-${index}`,
      }));
    case "word":
      return text.split(" ").map((word, index) => ({
        content: word,
        key: `word-${index}`,
      }));
    case "line":
      return text.split("\n").map((line, index) => ({
        content: line,
        key: `line-${index}`,
      }));
    default:
      return [{ content: text, key: "full-text" }];
  }
};

const TextAnimation = ({
  children,
  preset = "fade",
  unit = "word",
  duration = 0.6,
  delay = 0,
  stagger = 0.1,
  trigger = true,
  className = "",
  as = "div",
  ...props
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [textParts, setTextParts] = useState([]);

  // 자식 요소에서 텍스트 추출
  const extractText = (element) => {
    if (typeof element === "string") {
      return element;
    }
    if (React.isValidElement(element)) {
      return React.Children.toArray(element.props.children)
        .map(extractText)
        .join("");
    }
    if (Array.isArray(element)) {
      return element.map(extractText).join("");
    }
    return "";
  };

  useEffect(() => {
    const text = extractText(children);
    const parts = splitText(text, unit);
    setTextParts(parts);
  }, [children, unit]);

  useEffect(() => {
    if (trigger && isInView) {
      controls.start("visible");
    }
  }, [controls, trigger, isInView]);

  const Component = motion[as] || motion.div;
  const currentPreset =
    animationPresets[preset]?.[unit] || animationPresets.fade[unit];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: currentPreset.hidden,
    visible: {
      ...currentPreset.visible,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <Component
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      {...props}
    >
      {textParts.map((part, index) => (
        <motion.span
          key={`${part.key}-${index}`}
          variants={itemVariants}
          style={{
            display: unit === "line" ? "block" : "inline-block",
            marginRight: unit === "word" ? "0.25em" : "0",
          }}
        >
          {part.content}
        </motion.span>
      ))}
    </Component>
  );
};

export default TextAnimation;
