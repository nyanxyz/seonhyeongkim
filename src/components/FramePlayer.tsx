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

  return (
    <div {...props}>
      <img src={frames[0]} style={{ visibility: "hidden" }} />
      {frames.map((src, index) => (
        <img
          key={index}
          src={src}
          style={{
            position: "absolute",
            top: 0,
            left: 0,

            opacity: index === frameIndex ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}
