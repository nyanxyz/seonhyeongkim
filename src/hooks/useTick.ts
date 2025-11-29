import { useEffect, useState } from "react";

export function useTick(fps: number = 24) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTick((prev) => prev + 1);

    const frameDuration = Math.max(1, 1000 / fps);
    const timer = setInterval(() => {
      setTick((prev) => prev + 1);
    }, frameDuration);

    return () => clearInterval(timer);
  }, [fps]);

  return tick;
}
