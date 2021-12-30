import { FC, useEffect, useRef } from "react";

const ScrollToBottom: FC = () => {
  const elementRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    elementRef.current!.scrollIntoView({
      behavior: "smooth",
    });
  });

  return <div ref={elementRef} />;
};

export default ScrollToBottom;
