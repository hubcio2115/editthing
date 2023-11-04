import { useEffect, useState } from "react";

// sm, md, lg, xl, xxl (2xl) corresponding to tailwind viewport width breakpoints
// https://tailwindcss.com/docs/responsive-design
interface WindowDimensions {
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xxl: boolean;
  width: number;
  height: number;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    sm: width <= 640,
    md: width >= 768 && width > 640,
    lg: width >= 1024 && width > 768,
    xl: width >= 1280 && width > 1024,
    xxl: width >= 1536 && width > 1280,
    width,
    height,
  };
}

export default function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowDimensions;
}
