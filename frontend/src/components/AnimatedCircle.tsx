import React, { useEffect, useState, useRef } from 'react';

interface Props {
  colors: string[];
}

const AnimatedCircle: React.FC<Props> = ({ colors }) => {
  const [currentColor, setCurrentColor] = useState<string[]>([]);
  const circleRef = useRef<HTMLDivElement>(null);
//   const animationRef = useRef<number>();

  useEffect(() => {
    const animation = () => {
      const colorsLength = colors.length;
      let i = 0;
      let animationId = requestAnimationFrame(() => {
        if (i < colorsLength) {
          setCurrentColor([...currentColor, colors[i]]);
          i++;
          animationId = requestAnimationFrame(animation);
        } else {
          setCurrentColor([]);
          i = 0;
          animationId = requestAnimationFrame(animation);
        }
      });

      return () => cancelAnimationFrame(animationId);
    };

    animation();
  }, [colors]);

  useEffect(() => {
    if (circleRef.current) {
      const circle = circleRef.current;
      circle.style.background = `radial-gradient(circle at 50% 50%, ${currentColor.join(',')})`;
    }
  }, [currentColor]);

  return (
    <div
      ref={circleRef}
      className="relative flex items-center justify-center w-24 h-24 bg-white rounded-full"
    >
      <span className="text-2xl font-bold text-black">m.</span>
    </div>
  );
};

export default AnimatedCircle;
