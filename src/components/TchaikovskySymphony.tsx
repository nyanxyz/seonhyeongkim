import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { tchaiFrames } from "../constants/frames";
import { calculateAnimationSpeed, calculateAudioRate } from "../utils/rate";
import { AudioPlayer } from "./AudioPlayer";
import { BPMSlider } from "./BPMSlider";
import { BpmTimer, type BpmTimerHandle } from "./BPMTimer";

export function TchaikovskySymphony() {
  const timerRef = useRef<BpmTimerHandle>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const animatedSpritesRef = useRef<PIXI.AnimatedSprite[]>([]);
  const firstLoopRef = useRef(true);

  const [initialized, setInitialized] = useState(false);
  const [bpm, setBpm] = useState(90);

  const audioRate = calculateAudioRate(bpm);
  const gradientOpacity = Math.min(Math.max((bpm - 20) / 200, 0), 1);

  useEffect(() => {
    const init = async () => {
      const app = new PIXI.Application();
      await app.init({ resizeTo: containerRef.current || window, backgroundAlpha: 0 });

      if (containerRef.current?.hasChildNodes()) {
        containerRef.current.removeChild(containerRef.current.firstChild!);
      }
      containerRef.current?.appendChild(app.canvas);

      const container = new PIXI.Container();
      app.stage.addChild(container);

      await PIXI.Assets.load(tchaiFrames);

      const tchaiTextures = tchaiFrames.map((f) => PIXI.Assets.cache.get(f));

      const tchai = new PIXI.AnimatedSprite(tchaiTextures);
      tchai.setSize(667, 858);
      tchai.position.set(-70, 149);
      tchai.animationSpeed = 1;
      tchai.loop = true;
      tchai.play();

      const mask = new PIXI.Graphics();
      mask.rect(135, 149, 318, 552).fill(0xffffff);
      container.addChild(mask);
      tchai.mask = mask;

      container.addChild(tchai);

      appRef.current = app;
      animatedSpritesRef.current = [tchai];
      setInitialized(true);
    };
    init();

    return () => {
      appRef.current?.destroy(true);
      appRef.current = null;
      animatedSpritesRef.current = [];
    };
  }, []);

  useEffect(() => {
    animatedSpritesRef.current.forEach((sprite) => {
      sprite.animationSpeed = calculateAnimationSpeed(bpm);
    });
  }, [bpm]);

  return (
    <>
      {initialized && (
        <AudioPlayer
          src="/tchaikovsky_symphony.mp3"
          playbackRate={audioRate}
          onTimeUpdate={(currentTime) => {
            if (currentTime < 1 && !firstLoopRef.current) {
              timerRef.current?.reset();
            }
            if (currentTime >= 1) {
              firstLoopRef.current = false;
            }
          }}
          onPlay={() => {
            timerRef.current?.start();
          }}
        />
      )}

      <div className="h-screen w-screen flex flex-col overflow-hidden">
        <div className="relative flex-1">
          <img
            src="/background-gradient.png"
            className="absolute inset-0 w-full h-full"
            style={{ opacity: gradientOpacity }}
          />

          <div className="absolute top-[24px] left-[35px] font-antarctica font-bold text-[32px] text-black">
            <BpmTimer ref={timerRef} bpm={bpm} />
          </div>
          <div className="absolute top-[24px] left-0 right-0 mx-auto w-fit font-antarctica font-bold text-[32px] text-black">
            SYMPHONY NO.5 MVT.4
          </div>
          <div className="absolute top-[24px] right-[56px] font-antarctica font-bold text-[32px] text-black">
            P. TCHAIKOVSKY
          </div>

          <div ref={containerRef} className="absolute inset-0 w-full h-full">
            {/* canvas */}
          </div>
        </div>

        <BPMSlider value={bpm} onValueChange={setBpm} />

        {!initialized && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <span className="font-antarctica font-bold text-[24px] text-black">Loading...</span>
          </div>
        )}
      </div>
    </>
  );
}
