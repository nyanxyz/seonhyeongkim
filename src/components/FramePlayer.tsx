import { type ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"img"> {
  frames: string[];
  offset?: number;
  tick: number;
}

export function FramePlayer({ frames, offset = 0, tick, ...props }: Props) {
  const frameCount = frames.length;
  const startFrameIndex = ((offset % frameCount) + frameCount) % frameCount;
  const frameIndex = (startFrameIndex + tick) % frameCount;

  return <img src={frames[frameIndex]} {...props} />;
}
