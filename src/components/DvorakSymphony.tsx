import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import {
  birdFrames,
  landscapeFrames,
  manConductorFrames,
  oxFrames,
  runningManFrames,
  stopwatchFrames,
  tubaFrames,
} from "../constants/frames";
import { calculateAnimationSpeed, calculateAudioRate } from "../utils/rate";
import { AudioPlayer } from "./AudioPlayer";
import { BPMSlider } from "./BPMSlider";
import { BpmTimer } from "./BPMTimer";

export function DvorakSymphony() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const animatedSpritesRef = useRef<PIXI.AnimatedSprite[]>([]);
  const lastCurrentTimeRef = useRef(0);

  const [initialized, setInitialized] = useState(false);
  const [bpm, setBpm] = useState(90);
  const [loopCount, setLoopCount] = useState(0);
  const [audioStarted, setAudioStarted] = useState(false);

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
      await PIXI.Assets.load("/frame/frame(top).png");
      await PIXI.Assets.load("/frame/frame(bottom).png");
      await PIXI.Assets.load(runningManFrames);
      await PIXI.Assets.load(oxFrames);
      await PIXI.Assets.load("/track/track(left).png");
      await PIXI.Assets.load("/track/track(right).png");
      await PIXI.Assets.load(stopwatchFrames);
      await PIXI.Assets.load(tubaFrames);
      await PIXI.Assets.load(birdFrames);
      await PIXI.Assets.load(manConductorFrames);

      const landscapeTextures = landscapeFrames.map((frame) => PIXI.Assets.get(frame)!);
      const frameTopTexture = PIXI.Assets.get("/frame/frame(top).png")!;
      const frameBottomTexture = PIXI.Assets.get("/frame/frame(bottom).png")!;
      const runningManTextures = runningManFrames.map((frame) => PIXI.Assets.get(frame)!);
      const oxTextures = oxFrames.map((frame) => PIXI.Assets.get(frame)!);
      const trackLeftTexture = PIXI.Assets.get("/track/track(left).png")!;
      const trackRightTexture = PIXI.Assets.get("/track/track(right).png")!;
      const stopwatchTextures = stopwatchFrames.map((frame) => PIXI.Assets.get(frame)!);
      const tubaTextures = tubaFrames.map((frame) => PIXI.Assets.get(frame)!);
      const birdTextures = birdFrames.map((frame) => PIXI.Assets.get(frame)!);
      const manConductorTextures = manConductorFrames.map((frame) => PIXI.Assets.get(frame)!);

      const landscape = new PIXI.AnimatedSprite(landscapeTextures);
      landscape.setSize(624, 395);
      landscape.position.set(app.renderer.width - 624 - 70, 142);
      landscape.animationSpeed = 0.5;
      landscape.loop = true;
      landscape.play();

      const frameTop = new PIXI.Sprite(frameTopTexture);
      frameTop.setSize(756, 570);
      frameTop.position.set(app.renderer.width - 756 + 2, 51);

      const frameBottom = new PIXI.Sprite(frameBottomTexture);
      frameBottom.setSize(756, 570);
      frameBottom.position.set(app.renderer.width - 756 + 2, 51);

      const runningMan = new PIXI.AnimatedSprite(runningManTextures);
      runningMan.setSize(270, 324);
      runningMan.position.set(app.renderer.width - 206, 180);
      runningMan.scale.x = -1;
      runningMan.animationSpeed = 0.5;
      runningMan.loop = true;
      runningMan.play();

      const ox = new PIXI.AnimatedSprite(oxTextures);
      ox.setSize(713, 390);
      ox.position.set(app.renderer.width - 713 - 563, 72);
      ox.animationSpeed = 0.5;
      ox.loop = true;
      ox.play();

      const oxTrackLeft = new PIXI.Sprite(trackLeftTexture);
      oxTrackLeft.setSize(321, 491);
      oxTrackLeft.position.set(app.renderer.width - 321 - 751, 45);

      const oxTrackRight = new PIXI.Sprite(trackRightTexture);
      oxTrackRight.setSize(321, 491);
      oxTrackRight.position.set(app.renderer.width - 321 - 751, 45);

      const stopwatch = new PIXI.AnimatedSprite(stopwatchTextures);
      stopwatch.setSize(349, 300);
      stopwatch.anchor.set(1, 0);
      stopwatch.position.set(app.renderer.width - 55, 632);
      stopwatch.animationSpeed = 0.5;
      stopwatch.loop = true;
      stopwatch.play();

      const tuba = new PIXI.AnimatedSprite(tubaTextures);
      tuba.setSize(704, 360);
      tuba.position.set(app.renderer.width - 704 - 359, 544);
      tuba.animationSpeed = 0.5;
      tuba.loop = true;
      tuba.play();

      const bird1 = new PIXI.AnimatedSprite(birdTextures);
      bird1.setSize(1538, 876);
      bird1.position.set(app.renderer.width - 1538, 0);
      bird1.animationSpeed = 0.5;
      bird1.loop = true;
      bird1.play();

      const bird2 = new PIXI.AnimatedSprite(birdTextures);
      bird2.setSize(1538, 876);
      bird2.position.set(app.renderer.width - 1538, 0);
      bird2.animationSpeed = 0.5;
      bird2.loop = true;
      bird2.gotoAndPlay(1);

      const bird3 = new PIXI.AnimatedSprite(birdTextures);
      bird3.setSize(1538, 876);
      bird3.position.set(app.renderer.width - 1538, 0);
      bird3.animationSpeed = 0.5;
      bird3.loop = true;
      bird3.gotoAndPlay(2);

      const bird4 = new PIXI.AnimatedSprite(birdTextures);
      bird4.setSize(1538, 876);
      bird4.position.set(app.renderer.width - 1538, 0);
      bird4.animationSpeed = 0.5;
      bird4.loop = true;
      bird4.gotoAndPlay(5);

      const bird5 = new PIXI.AnimatedSprite(birdTextures);
      bird5.setSize(1538, 876);
      bird5.position.set(app.renderer.width - 1538, 0);
      bird5.animationSpeed = 0.5;
      bird5.loop = true;
      bird5.gotoAndPlay(9);

      const manConductor1 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor1.setSize(2199, 1203);
      manConductor1.anchor.set(0, 1);
      manConductor1.position.set(-642, app.renderer.height + 249);
      manConductor1.animationSpeed = 0.5;
      manConductor1.loop = true;
      manConductor1.play();

      const manConductor2 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor2.setSize(2014, 1102);
      manConductor2.anchor.set(0, 1);
      manConductor2.position.set(-503, app.renderer.height + 229);
      manConductor2.animationSpeed = 0.5;
      manConductor2.loop = true;
      manConductor2.gotoAndPlay(3);

      const manConductor3 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor3.setSize(1807, 989);
      manConductor3.anchor.set(0, 1);
      manConductor3.position.set(-352, app.renderer.height + 204);
      manConductor3.animationSpeed = 0.5;
      manConductor3.loop = true;
      manConductor3.gotoAndPlay(6);

      const manConductor4 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor4.setSize(1624, 889);
      manConductor4.anchor.set(0, 1);
      manConductor4.position.set(-216, app.renderer.height + 177);
      manConductor4.animationSpeed = 0.5;
      manConductor4.loop = true;
      manConductor4.gotoAndPlay(9);

      const manConductor5 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor5.setSize(1480, 810);
      manConductor5.anchor.set(0, 1);
      manConductor5.position.set(-80, app.renderer.height + 155);
      manConductor5.animationSpeed = 0.5;
      manConductor5.loop = true;
      manConductor5.gotoAndPlay(12);

      const manConductor6 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor6.setSize(1338, 730);
      manConductor6.anchor.set(0, 1);
      manConductor6.position.set(50, app.renderer.height + 134);
      manConductor6.animationSpeed = 0.5;
      manConductor6.loop = true;
      manConductor6.gotoAndPlay(15);

      const manConductor7 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor7.setSize(1200, 650);
      manConductor7.anchor.set(0, 1);
      manConductor7.position.set(200, app.renderer.height + 115);
      manConductor7.animationSpeed = 0.5;
      manConductor7.loop = true;
      manConductor7.gotoAndPlay(18);

      const manConductor8 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor8.setSize(1080, 580);
      manConductor8.anchor.set(0, 1);
      manConductor8.position.set(320, app.renderer.height + 98);
      manConductor8.animationSpeed = 0.5;
      manConductor8.loop = true;
      manConductor8.gotoAndPlay(21);

      const manConductor9 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor9.setSize(365, 200);
      manConductor9.anchor.set(0, 1);
      manConductor9.position.set(744, app.renderer.height + 35);
      manConductor9.animationSpeed = 0.5;
      manConductor9.loop = true;
      manConductor9.gotoAndPlay(24);

      const manConductor10 = new PIXI.AnimatedSprite(manConductorTextures);
      manConductor10.setSize(171, 94);
      manConductor10.anchor.set(0, 1);
      manConductor10.position.set(891, app.renderer.height + 17);
      manConductor10.animationSpeed = 0.5;
      manConductor10.loop = true;
      manConductor10.gotoAndPlay(27);

      container.addChild(landscape);

      container.addChild(frameBottom);
      container.addChild(runningMan);
      container.addChild(oxTrackRight);
      container.addChild(ox);
      container.addChild(stopwatch);
      container.addChild(bird1);
      container.addChild(bird2);
      container.addChild(bird3);
      container.addChild(bird4);
      container.addChild(bird5);
      container.addChild(oxTrackLeft);
      container.addChild(frameTop);
      container.addChild(tuba);
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
        landscape,
        ox,
        stopwatch,
        tuba,
        bird1,
        bird2,
        bird3,
        bird4,
        bird5,
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
            if (currentTime < 1 && lastCurrentTimeRef.current >= 1) {
              setLoopCount((count) => count + 1);
            }
            lastCurrentTimeRef.current = currentTime;
          }}
          onPlay={() => {
            setAudioStarted(true);
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
            <BpmTimer key={loopCount} bpm={bpm} paused={!audioStarted} />
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
