import { useEffect, useState, type ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"img"> {
  frames: string[];
  offset?: number;
  fps?: number;
}

export function FramePlayer({ frames, offset = 0, fps = 24, ...props }: Props) {
  const frameCount = frames.length;
  const startFrameIndex = ((offset % frameCount) + frameCount) % frameCount;
  const [frameIndex, setFrameIndex] = useState(startFrameIndex);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFrameIndex((prev) => (prev + 1) % frameCount);

    const frameDuration = Math.max(1, 1000 / fps);
    const timer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frameCount);
    }, frameDuration);

    return () => clearInterval(timer);
  }, [fps]);

  return (
    <>
      {frames.map((frame, index) => (
        <img
          key={index}
          src={frame}
          style={{ display: index === frameIndex ? "block" : "none" }}
          {...props}
        />
      ))}
    </>
  );
}
