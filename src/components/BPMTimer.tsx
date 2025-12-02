import { useEffect, useRef, useState } from "react";

interface Props {
  bpm: number;
  paused?: boolean;
}

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
};

const getSpeedFactor = (rawBpm: number) => {
  const bpm = Math.min(200, Math.max(20, rawBpm));

  if (bpm < 90) {
    const t = (bpm - 20) / (90 - 20);
    return 0.3 + t * (1 - 0.3);
  }

  if (bpm <= 150) {
    const t = (bpm - 90) / (150 - 90);
    const curved = Math.pow(t, 0.7);
    return 1 + curved * (2 - 1);
  }

  const t = (bpm - 150) / (200 - 150);
  const curved = Math.pow(t, 1.8);
  return 2 + curved * (6 - 2);
};

export function BpmTimer({ bpm, paused = false }: Props) {
  const [elapsedSec, setElapsedSec] = useState(0);
  const speedRef = useRef(getSpeedFactor(bpm));
  const pausedRef = useRef(paused);

  useEffect(() => {
    speedRef.current = getSpeedFactor(bpm);
  }, [bpm]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    let frameId: number;
    let prevTime: number | null = null;

    const tick = (now: number) => {
      if (pausedRef.current) {
        prevTime = now;
        frameId = requestAnimationFrame(tick);
        return;
      }

      if (prevTime == null) {
        prevTime = now;
      }

      const deltaSec = (now - prevTime) / 1000;
      prevTime = now;

      setElapsedSec((prev) => prev + deltaSec * speedRef.current);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return <>{formatTime(elapsedSec)}</>;
}
