import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import {
  brahmsSpinFrames,
  hungarianGirlFrames,
  hungarianManFrames,
  manConductorFrames,
  runningManFrames,
} from "../constants/frames";
import { calculateAnimationSpeed, calculateAudioRate } from "../utils/rate";
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const spritesRef = useRef<PIXI.AnimatedSprite[]>([]);

  const [initialized, setInitialized] = useState(false);
  const [bpm, setBpm] = useState(90);
  const [audioCurrentTime, setCurrentTime] = useState(0);

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

      await PIXI.Assets.load(brahmsSpinFrames);
      await PIXI.Assets.load(manConductorFrames);
      await PIXI.Assets.load(runningManFrames);
      await PIXI.Assets.load(hungarianManFrames);
      await PIXI.Assets.load(hungarianGirlFrames);

      const brahmsSpinTextures = brahmsSpinFrames.map((f) => PIXI.Assets.cache.get(f));
      const manConductorTextures = manConductorFrames.map((f) => PIXI.Assets.cache.get(f));
      const runningManTextures = runningManFrames.map((f) => PIXI.Assets.cache.get(f));
      const hungarianManTextures = hungarianManFrames.map((f) => PIXI.Assets.cache.get(f));
      const hungarianGirlTextures = hungarianGirlFrames.map((f) => PIXI.Assets.cache.get(f));

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

      const hungarianGirl1 = new PIXI.AnimatedSprite(hungarianGirlTextures);
      hungarianGirl1.setSize(893, 1633);
      hungarianGirl1.anchor.set(0.5, 0.5);
      hungarianGirl1.rotation = 71 * (Math.PI / 180);
      hungarianGirl1.position.set(app.renderer.width / 2, app.renderer.height / 2);
      hungarianGirl1.animationSpeed = 1;
      hungarianGirl1.loop = true;
      hungarianGirl1.gotoAndPlay(28);

      const hungarianGirl2 = new PIXI.AnimatedSprite(hungarianGirlTextures);
      hungarianGirl2.setSize(792, 1448);
      hungarianGirl2.anchor.set(0.5, 0.5);
      hungarianGirl2.rotation = 58 * (Math.PI / 180);
      hungarianGirl2.position.set(app.renderer.width / 2, app.renderer.height / 2);
      hungarianGirl2.animationSpeed = 1;
      hungarianGirl2.loop = true;
      hungarianGirl2.gotoAndPlay(24);

      const hungarianGirl3 = new PIXI.AnimatedSprite(hungarianGirlTextures);
      hungarianGirl3.setSize(691, 1263);
      hungarianGirl3.anchor.set(0.5, 0.5);
      hungarianGirl3.rotation = 45 * (Math.PI / 180);
      hungarianGirl3.position.set(app.renderer.width / 2, app.renderer.height / 2);
      hungarianGirl3.animationSpeed = 1;
      hungarianGirl3.loop = true;
      hungarianGirl3.gotoAndPlay(20);

      const hungarianGirl4 = new PIXI.AnimatedSprite(hungarianGirlTextures);
      hungarianGirl4.setSize(591, 1089);
      hungarianGirl4.anchor.set(0.5, 0.5);
      hungarianGirl4.rotation = 33 * (Math.PI / 180);
      hungarianGirl4.position.set(app.renderer.width / 2, app.renderer.height / 2);
      hungarianGirl4.animationSpeed = 1;
      hungarianGirl4.loop = true;
      hungarianGirl4.gotoAndPlay(16);

      const hungarianGirl5 = new PIXI.AnimatedSprite(hungarianGirlTextures);
      hungarianGirl5.setSize(490, 903);
      hungarianGirl5.anchor.set(0.5, 0.5);
      hungarianGirl5.rotation = 21 * (Math.PI / 180);
      hungarianGirl5.position.set(app.renderer.width / 2, app.renderer.height / 2);
      hungarianGirl5.animationSpeed = 1;
      hungarianGirl5.loop = true;
      hungarianGirl5.gotoAndPlay(12);

      const hungarianGirl6 = new PIXI.AnimatedSprite(hungarianGirlTextures);
      hungarianGirl6.setSize(389, 717);
      hungarianGirl6.anchor.set(0.5, 0.5);
      hungarianGirl6.rotation = 9 * (Math.PI / 180);
      hungarianGirl6.position.set(app.renderer.width / 2, app.renderer.height / 2);
      hungarianGirl6.animationSpeed = 1;
      hungarianGirl6.loop = true;
      hungarianGirl6.gotoAndPlay(8);

      const hungarianGirl7 = new PIXI.AnimatedSprite(hungarianGirlTextures);
      hungarianGirl7.setSize(294, 542);
      hungarianGirl7.anchor.set(0.5, 0.5);
      hungarianGirl7.rotation = -4 * (Math.PI / 180);
      hungarianGirl7.position.set(app.renderer.width / 2, app.renderer.height / 2);
      hungarianGirl7.animationSpeed = 1;
      hungarianGirl7.loop = true;
      hungarianGirl7.gotoAndPlay(4);

      const hungarianGirl8 = new PIXI.AnimatedSprite(hungarianGirlTextures);
      hungarianGirl8.setSize(188, 347);
      hungarianGirl8.anchor.set(0.5, 0.5);
      hungarianGirl8.rotation = -16 * (Math.PI / 180);
      hungarianGirl8.position.set(app.renderer.width / 2, app.renderer.height / 2);
      hungarianGirl8.animationSpeed = 1;
      hungarianGirl8.loop = true;
      hungarianGirl8.play();

      container.addChild(brahmsSpin);
      container.addChild(manConductor);
      container.addChild(runningMan);
      container.addChild(hungarianMan);
      container.addChild(hungarianGirl1);
      container.addChild(hungarianGirl2);
      container.addChild(hungarianGirl3);
      container.addChild(hungarianGirl4);
      container.addChild(hungarianGirl5);
      container.addChild(hungarianGirl6);
      container.addChild(hungarianGirl7);
      container.addChild(hungarianGirl8);

      appRef.current = app;
      spritesRef.current = [
        brahmsSpin,
        manConductor,
        runningMan,
        hungarianMan,
        hungarianGirl1,
        hungarianGirl2,
        hungarianGirl3,
        hungarianGirl4,
        hungarianGirl5,
        hungarianGirl6,
        hungarianGirl7,
        hungarianGirl8,
      ];
      setInitialized(true);
    };
    init();
  }, []);

  useEffect(() => {
    spritesRef.current.forEach((sprite) => {
      sprite.animationSpeed = calculateAnimationSpeed(bpm);
    });
  }, [bpm]);

  return (
    <>
      {initialized && (
        <AudioPlayer
          src="/hungarian_dance.m4a"
          playbackRate={audioRate}
          onTimeUpdate={setCurrentTime}
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

          <img
            src="/brahms_frame/brahms_frame.png"
            className="absolute top-[44px] left-[5px] w-[638px]"
          />
          <img
            src="/runningtrack_circle/runningtrack_circle.png"
            className="absolute -bottom-[54px] right-[181px] w-[584px]"
          />
          <img
            src="/hungarian_man_shadow/hungarian_man_shadow.png"
            className="absolute -bottom-[6px] right-[30px] w-[269px]"
          />

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
