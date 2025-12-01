import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import {
  clockFrames,
  landscapeFrames,
  manConductorFrames,
  oxTrackFrames,
  runningManFrames,
  stopwatchFrames,
} from "../constants/frames";
import { calculateAnimationSpeed, calculateAudioRate } from "../utils/rate";
import { AudioPlayer } from "./AudioPlayer";
import { BPMSlider } from "./BPMSlider";
import { BpmTimer, type BpmTimerHandle } from "./BPMTimer";

export function DvorakSymphony() {
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

      await PIXI.Assets.load(landscapeFrames);
      await PIXI.Assets.load("/landscape/frame.png");
      await PIXI.Assets.load(runningManFrames);
      await PIXI.Assets.load(oxTrackFrames);
      await PIXI.Assets.load(stopwatchFrames);
      await PIXI.Assets.load(clockFrames);
      await PIXI.Assets.load(manConductorFrames);

      const landscapeTextures = landscapeFrames.map((frame) => PIXI.Assets.get(frame)!);
      const frameTexture = PIXI.Assets.get("/landscape/frame.png")!;
      const runningManTextures = runningManFrames.map((frame) => PIXI.Assets.get(frame)!);
      const oxTrackTextures = oxTrackFrames.map((frame) => PIXI.Assets.get(frame)!);
      const stopwatchTextures = stopwatchFrames.map((frame) => PIXI.Assets.get(frame)!);
      const clockTextures = clockFrames.map((frame) => PIXI.Assets.get(frame)!);
      const manConductorTextures = manConductorFrames.map((frame) => PIXI.Assets.get(frame)!);

      const landscape = new PIXI.AnimatedSprite(landscapeTextures);
      landscape.setSize(632 * 0.85, 400 * 0.85);
      landscape.position.set(app.renderer.width - 632 * 0.85 - 63, 130);

      const frame = new PIXI.Sprite(frameTexture);
      frame.setSize(756 * 0.85, 756 * 0.85);
      frame.position.set(app.renderer.width - 756 * 0.85 + 1, -21);

      const runningMan = new PIXI.AnimatedSprite(runningManTextures);
      runningMan.setSize(231, 277);
      runningMan.position.set(app.renderer.width - 180, 164);
      runningMan.scale.x = -1;
      runningMan.animationSpeed = 0.5;
      runningMan.loop = true;
      runningMan.play();

      const oxTrack = new PIXI.AnimatedSprite(oxTrackTextures);
      oxTrack.setSize(773, 399);
      oxTrack.position.set(app.renderer.width - 773 - 490, 41);
      oxTrack.animationSpeed = 0.5;
      oxTrack.loop = true;
      oxTrack.play();

      const stopwatch = new PIXI.AnimatedSprite(stopwatchTextures);
      stopwatch.setSize(349, 300);
      stopwatch.anchor.set(1, 1);
      stopwatch.position.set(app.renderer.width - 55, app.renderer.height - 25);
      stopwatch.animationSpeed = 0.5;
      stopwatch.loop = true;
      stopwatch.play();

      const clock = new PIXI.AnimatedSprite(clockTextures);
      clock.setSize(230, 310);
      clock.anchor.set(1, 1);
      clock.position.set(app.renderer.width - 428, app.renderer.height - 20);
      clock.animationSpeed = 0.5;
      clock.loop = true;
      clock.play();

      const manConductor1 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor1.setSize(2199 * 0.9, 1203 * 0.9);
      manConductor1.anchor.set(0, 1);
      manConductor1.position.set(-642 * 0.9, app.renderer.height + 249 * 0.9);
      manConductor1.animationSpeed = 0.5;
      manConductor1.loop = true;
      manConductor1.play();

      const manConductor2 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor2.setSize(2014 * 0.9, 1102 * 0.9);
      manConductor2.anchor.set(0, 1);
      manConductor2.position.set(-503 * 0.9, app.renderer.height + 229 * 0.9);
      manConductor2.animationSpeed = 0.5;
      manConductor2.loop = true;
      manConductor2.gotoAndPlay(3);

      const manConductor3 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor3.setSize(1807 * 0.9, 989 * 0.9);
      manConductor3.anchor.set(0, 1);
      manConductor3.position.set(-352 * 0.9, app.renderer.height + 204 * 0.9);
      manConductor3.animationSpeed = 0.5;
      manConductor3.loop = true;
      manConductor3.gotoAndPlay(6);

      const manConductor4 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor4.setSize(1624 * 0.9, 889 * 0.9);
      manConductor4.anchor.set(0, 1);
      manConductor4.position.set(-216 * 0.9, app.renderer.height + 177 * 0.9);
      manConductor4.animationSpeed = 0.5;
      manConductor4.loop = true;
      manConductor4.gotoAndPlay(9);

      const manConductor5 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor5.setSize(1480 * 0.9, 810 * 0.9);
      manConductor5.anchor.set(0, 1);
      manConductor5.position.set(-80 * 0.9, app.renderer.height + 155 * 0.9);
      manConductor5.animationSpeed = 0.5;
      manConductor5.loop = true;
      manConductor5.play();

      const manConductor6 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor6.setSize(1338 * 0.9, 730 * 0.9);
      manConductor6.anchor.set(0, 1);
      manConductor6.position.set(50 * 0.9, app.renderer.height + 134 * 0.9);
      manConductor6.animationSpeed = 0.5;
      manConductor6.loop = true;
      manConductor6.play();

      const manConductor7 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor7.setSize(1200 * 0.9, 650 * 0.9);
      manConductor7.anchor.set(0, 1);
      manConductor7.position.set(200 * 0.9, app.renderer.height + 115 * 0.9);
      manConductor7.animationSpeed = 0.5;
      manConductor7.loop = true;
      manConductor7.play();

      const manConductor8 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor8.setSize(1080 * 0.9, 580 * 0.9);
      manConductor8.anchor.set(0, 1);
      manConductor8.position.set(320 * 0.9, app.renderer.height + 98 * 0.9);
      manConductor8.animationSpeed = 0.5;
      manConductor8.loop = true;
      manConductor8.play();

      const manConductor9 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor9.setSize(365 * 0.9, 200 * 0.9);
      manConductor9.anchor.set(0, 1);
      manConductor9.position.set(744 * 0.9, app.renderer.height + 35 * 0.9);
      manConductor9.animationSpeed = 0.5;
      manConductor9.loop = true;
      manConductor9.gotoAndPlay(24);

      const manConductor10 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor10.setSize(171 * 0.9, 94 * 0.9);
      manConductor10.anchor.set(0, 1);
      manConductor10.position.set(891 * 0.9, app.renderer.height + 17 * 0.9);
      manConductor10.animationSpeed = 0.5;
      manConductor10.loop = true;
      manConductor10.gotoAndPlay(27);

      container.addChild(landscape);
      container.addChild(frame);
      container.addChild(runningMan);
      container.addChild(oxTrack);
      container.addChild(stopwatch);
      container.addChild(clock);
      container.addChild(manConductor10);
      container.addChild(manConductor9);
      container.addChild(manConductor8);
      container.addChild(manConductor7);
      container.addChild(manConductor6);
      container.addChild(manConductor5);
      container.addChild(manConductor4);
      container.addChild(manConductor3);
      container.addChild(manConductor2);
      container.addChild(manConductor1);

      appRef.current = app;
      animatedSpritesRef.current = [
        runningMan,
        oxTrack,
        stopwatch,
        clock,
        manConductor1,
        manConductor2,
        manConductor3,
        manConductor4,
        manConductor5,
        manConductor6,
        manConductor7,
        manConductor8,
        manConductor9,
        manConductor10,
      ];
      setInitialized(true);
    };
    init();

    return () => {
      appRef.current?.destroy(true);
      appRef.current = null;
      animatedSpritesRef.current = [];
      PIXI.Assets.reset();
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
          src="/dvorak_symphony.mp3"
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
            SYMPHONY NO.7 MVT.3
          </div>
          <div className="absolute top-[24px] right-[56px] font-antarctica font-bold text-[32px] text-black">
            A. DVOŘÁK
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
