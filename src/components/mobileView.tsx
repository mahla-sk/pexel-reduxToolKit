import { useState, useEffect } from "react";

export function mobileView() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleSize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);
  return isMobile;
}
