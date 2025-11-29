import { useEffect, useState } from "react";

export function useTick(fps: number) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const frameDuration = 1000 / fps;
    let last = performance.now();
    let handle: number | null = null;

    function loop(time: number) {
      if (time - last >= frameDuration) {
        last = time;
        setTick((t) => t + 1);
      }
      handle = requestAnimationFrame(loop);
    }

    handle = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(handle!);
  }, [fps]);

  return tick;
}
