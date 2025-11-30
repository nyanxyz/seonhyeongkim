import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import {
  brahmsSpinFrames,
  hungarianManFrames,
  manConductorFrames,
  runningManFrames,
} from "../constants/frames";
import { AudioPlayer } from "./AudioPlayer";
import { BPMSlider } from "./BPMSlider";

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
};

export function HungarianDance() {
  const initRef = useRef(false);

  const [bpm, setBpm] = useState(90);
  const [audioCurrentTime, setCurrentTime] = useState(0);

  const audioRate = bpm / 90;
  const gradientOpacity = Math.min(Math.max((bpm - 20) / 200, 0), 1);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const init = async () => {
      if (initRef.current) return;
      initRef.current = true;

      const app = new PIXI.Application();
      await app.init({ resizeTo: containerRef.current || window, backgroundAlpha: 0 });

      containerRef.current?.appendChild(app.canvas);

      const container = new PIXI.Container();
      app.stage.addChild(container);

      await PIXI.Assets.load(brahmsSpinFrames);
      await PIXI.Assets.load(manConductorFrames);
      await PIXI.Assets.load(runningManFrames);
      await PIXI.Assets.load(hungarianManFrames);

      const brahmsSpinTextures = brahmsSpinFrames.map((f) => PIXI.Assets.cache.get(f));
      const manConductorTextures = manConductorFrames.map((f) => PIXI.Assets.cache.get(f));
      const runningManTextures = runningManFrames.map((f) => PIXI.Assets.cache.get(f));
      const hungarianManTextures = hungarianManFrames.map((f) => PIXI.Assets.cache.get(f));

      const brahmsSpin = new PIXI.AnimatedSprite(brahmsSpinTextures);
      brahmsSpin.setSize(445, 593);
      brahmsSpin.position.set(106, 132);
      brahmsSpin.animationSpeed = 0.5;
      brahmsSpin.loop = true;
      brahmsSpin.play();

      const manConductor = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor.setSize(1564, 856);
      manConductor.position.set(-734, 79);
      manConductor.animationSpeed = 0.5;
      manConductor.loop = true;
      manConductor.play();

      const runningMan = new PIXI.AnimatedSprite(runningManTextures);
      runningMan.setSize(263, 316);
      runningMan.position.set(app.renderer.width - 263 - 348, app.renderer.height - 316 - 84);
      runningMan.animationSpeed = 1;
      runningMan.loop = true;
      runningMan.play();

      const hungarianMan = new PIXI.AnimatedSprite(hungarianManTextures);
      hungarianMan.setSize(365, 667); // Set appropriate size
      hungarianMan.position.set(app.renderer.width - 365 - 7, app.renderer.height - 667 - 4); // Set appropriate position
      hungarianMan.animationSpeed = 1;
      hungarianMan.loop = true;
      hungarianMan.play();

      container.addChild(brahmsSpin);
      container.addChild(manConductor);
      container.addChild(runningMan);
      container.addChild(hungarianMan);
    };
    init();
  }, []);

  return (
    <>
      <AudioPlayer
        src="/hungarian_dance.m4a"
        playbackRate={audioRate}
        onTimeUpdate={setCurrentTime}
      />

      <div className="h-screen w-screen flex flex-col overflow-hidden">
        <div className="relative flex-1">
          <img
            src="/background-gradient.png"
            className="absolute inset-0 w-full h-full"
            style={{ opacity: gradientOpacity }}
          />

          <div className="absolute top-[24px] left-[35px] font-antarctica font-bold text-[32px] text-black">
            {formatTime(audioCurrentTime)}
          </div>
          <div className="absolute top-[24px] left-0 right-0 mx-auto w-fit font-antarctica font-bold text-[32px] text-black">
            HUNGARIAN DANCE NO.5
          </div>
          <div className="absolute top-[24px] right-[56px] font-antarctica font-bold text-[32px] text-black">
            J. BRAHMS
          </div>

          <div className="absolute bottom-[30px] left-[35px] font-antarctica text-[13px] text-black">
            “Hungarian Dance No. 5” by Fulda Symphony Orchestra is licensed under CC BY.
          </div>

          <div ref={containerRef} className="absolute inset-0 w-full h-full">
            {/* canvas */}
          </div>
        </div>

        <BPMSlider tick={0} value={bpm} onValueChange={setBpm} />
      </div>
    </>
  );
}
