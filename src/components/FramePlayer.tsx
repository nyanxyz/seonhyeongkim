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
    if (frameCount <= 1) return;

    const frameDuration = Math.max(1, 1000 / fps);
    const timer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frameCount);
    }, frameDuration);

    return () => clearInterval(timer);
  }, [frameCount, fps]);

  return <img src={frames[frameIndex]} {...props} />;
}
