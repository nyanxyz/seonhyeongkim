import * as PIXI from "pixi.js";
import { useEffect, useRef, useState } from "react";
import {
  clockFrames,
  heartsFrames,
  runnerFrames,
  tchaiFrames,
  trumpetManFrames,
  violinFrames,
  womanConductorFrames,
} from "../constants/frames";
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
      await PIXI.Assets.load(heartsFrames);
      await PIXI.Assets.load("/track/track.png");
      await PIXI.Assets.load(trumpetManFrames);
      await PIXI.Assets.load(clockFrames);
      await PIXI.Assets.load(runnerFrames);
      await PIXI.Assets.load(violinFrames);
      await PIXI.Assets.load(womanConductorFrames);

      const tchaiTextures = tchaiFrames.map((f) => PIXI.Assets.cache.get(f));
      const heartsTextures = heartsFrames.map((f) => PIXI.Assets.cache.get(f));
      const trackTexture = PIXI.Assets.cache.get("/track/track.png");
      const trumpetManTextures = trumpetManFrames.map((f) => PIXI.Assets.cache.get(f));
      const clockTextures = clockFrames.map((f) => PIXI.Assets.cache.get(f));
      const runnerTextures = runnerFrames.map((f) => PIXI.Assets.cache.get(f));
      const violinTextures = violinFrames.map((f) => PIXI.Assets.cache.get(f));
      const womanConductorTextures = womanConductorFrames.map((f) => PIXI.Assets.cache.get(f));

      const tchai = new PIXI.AnimatedSprite(tchaiTextures);
      tchai.setSize(644, 828);
      tchai.position.set(-55, 158);
      tchai.animationSpeed = 0.5;
      tchai.loop = true;
      tchai.play();

      const mask = new PIXI.Graphics();
      mask.rect(135, 149, 318, 590).fill(0xffffff);
      container.addChild(mask);
      tchai.mask = mask;

      const hearts = new PIXI.AnimatedSprite(heartsTextures);
      hearts.setSize(107, 128);
      hearts.position.set(235, 535);
      hearts.animationSpeed = 0.5;
      hearts.loop = true;
      hearts.play();

      const track = new PIXI.Sprite(trackTexture);
      track.setSize(464, 766);
      track.position.set(56, 67);

      const trumpetMan = new PIXI.AnimatedSprite(trumpetManTextures);
      trumpetMan.setSize(307, 517);
      trumpetMan.position.set(544, 84);
      trumpetMan.animationSpeed = 0.5;
      trumpetMan.loop = true;
      trumpetMan.play();

      const clock = new PIXI.AnimatedSprite(clockTextures);
      clock.setSize(277, 374);
      clock.position.set(app.renderer.width - 277 - 551, 73);
      clock.animationSpeed = 0.5;
      clock.loop = true;
      clock.play();

      const runner1 = new PIXI.AnimatedSprite(runnerTextures);
      runner1.setSize(618, 924);
      runner1.position.set(-20, 10);
      runner1.animationSpeed = 0.5;
      runner1.loop = true;
      runner1.play();

      const runner2 = new PIXI.AnimatedSprite(runnerTextures);
      runner2.setSize(618, 924);
      runner2.position.set(-20, 10);
      runner2.animationSpeed = 0.5;
      runner2.loop = true;
      runner2.gotoAndPlay(25);

      const runner3 = new PIXI.AnimatedSprite(runnerTextures);
      runner3.setSize(618, 924);
      runner3.position.set(-20, 10);
      runner3.animationSpeed = 0.5;
      runner3.loop = true;
      runner3.gotoAndPlay(50);

      const runner4 = new PIXI.AnimatedSprite(runnerTextures);
      runner4.setSize(618, 924);
      runner4.position.set(-20, 10);
      runner4.animationSpeed = 0.5;
      runner4.loop = true;
      runner4.gotoAndPlay(75);

      const violin = new PIXI.AnimatedSprite(violinTextures);
      violin.setSize(721, 413);
      violin.position.set(app.renderer.width - 721 + 128, 2);
      violin.animationSpeed = 0.5;
      violin.loop = true;
      violin.play();

      const offset = 3;

      const womanConductor1 = new PIXI.AnimatedSprite(womanConductorTextures);
      womanConductor1.setSize(1080, 1872);
      womanConductor1.scale.set(0.2);
      womanConductor1.anchor.set(0, 1);
      womanConductor1.position.set(121, app.renderer.height + 132);
      womanConductor1.animationSpeed = 0.5;
      womanConductor1.loop = true;
      womanConductor1.play();

      const womanConductor2 = new PIXI.AnimatedSprite(womanConductorTextures);
      womanConductor2.setSize(1080, 1872);
      womanConductor2.scale.set(0.26);
      womanConductor2.anchor.set(0, 1);
      womanConductor2.position.set(214, app.renderer.height + 150);
      womanConductor2.animationSpeed = 0.5;
      womanConductor2.loop = true;
      womanConductor2.gotoAndPlay((1 * offset) % womanConductorFrames.length);

      const womanConductor3 = new PIXI.AnimatedSprite(womanConductorTextures);
      womanConductor3.setSize(1080, 1872);
      womanConductor3.scale.set(0.32);
      womanConductor3.anchor.set(0, 1);
      womanConductor3.position.set(310, app.renderer.height + 157);
      womanConductor3.animationSpeed = 0.5;
      womanConductor3.loop = true;
      womanConductor3.gotoAndPlay((2 * offset) % womanConductorFrames.length);

      const womanConductor4 = new PIXI.AnimatedSprite(womanConductorTextures);
      womanConductor4.setSize(1080, 1872);
      womanConductor4.scale.set(0.38);
      womanConductor4.anchor.set(0, 1);
      womanConductor4.position.set(407, app.renderer.height + 167);
      womanConductor4.animationSpeed = 0.5;
      womanConductor4.loop = true;
      womanConductor4.gotoAndPlay((3 * offset) % womanConductorFrames.length);

      const womanConductor5 = new PIXI.AnimatedSprite(womanConductorTextures);
      womanConductor5.setSize(1080, 1872);
      womanConductor5.scale.set(0.44);
      womanConductor5.anchor.set(0, 1);
      womanConductor5.position.set(503, app.renderer.height + 188);
      womanConductor5.animationSpeed = 0.5;
      womanConductor5.loop = true;
      womanConductor5.gotoAndPlay((4 * offset) % womanConductorFrames.length);

      const womanConductor6 = new PIXI.AnimatedSprite(womanConductorTextures);
      womanConductor6.setSize(1080, 1872);
      womanConductor6.scale.set(0.5);
      womanConductor6.anchor.set(0, 1);
      womanConductor6.position.set(600, app.renderer.height + 209);
      womanConductor6.animationSpeed = 0.5;
      womanConductor6.loop = true;
      womanConductor6.gotoAndPlay((5 * offset) % womanConductorFrames.length);

      const womanConductor7 = new PIXI.AnimatedSprite(womanConductorTextures);
      womanConductor7.setSize(1080, 1872);
      womanConductor7.scale.set(0.56);
      womanConductor7.anchor.set(0, 1);
      womanConductor7.position.set(710, app.renderer.height + 220);
      womanConductor7.animationSpeed = 0.5;
      womanConductor7.loop = true;
      womanConductor7.gotoAndPlay((6 * offset) % womanConductorFrames.length);

      const womanConductor8 = new PIXI.AnimatedSprite(womanConductorTextures);
      womanConductor8.setSize(1080, 1872);
      womanConductor8.scale.set(0.62);
      womanConductor8.anchor.set(0, 1);
      womanConductor8.position.set(820, app.renderer.height + 235);
      womanConductor8.animationSpeed = 0.5;
      womanConductor8.loop = true;
      womanConductor8.gotoAndPlay((7 * offset) % womanConductorFrames.length);

      const womanConductor9 = new PIXI.AnimatedSprite(womanConductorTextures);
      womanConductor9.setSize(1080, 1872);
      womanConductor9.scale.set(0.68);
      womanConductor9.anchor.set(0, 1);
      womanConductor9.position.set(930, app.renderer.height + 250);
      womanConductor9.animationSpeed = 0.5;
      womanConductor9.loop = true;
      womanConductor9.gotoAndPlay((8 * offset) % womanConductorFrames.length);

      const womanConductor10 = new PIXI.AnimatedSprite(womanConductorTextures);
      womanConductor10.setSize(1080, 1872);
      womanConductor10.scale.set(0.74);
      womanConductor10.anchor.set(0, 1);
      womanConductor10.position.set(1040, app.renderer.height + 264);
      womanConductor10.animationSpeed = 0.5;
      womanConductor10.loop = true;
      womanConductor10.gotoAndPlay((9 * offset) % womanConductorFrames.length);

      container.addChild(tchai);
      container.addChild(hearts);
      container.addChild(trumpetMan);
      container.addChild(track);
      container.addChild(clock);
      container.addChild(runner1);
      container.addChild(runner2);
      container.addChild(runner3);
      container.addChild(runner4);
      container.addChild(violin);
      container.addChild(womanConductor1);
      container.addChild(womanConductor2);
      container.addChild(womanConductor3);
      container.addChild(womanConductor4);
      container.addChild(womanConductor5);
      container.addChild(womanConductor6);
      container.addChild(womanConductor7);
      container.addChild(womanConductor8);
      container.addChild(womanConductor9);
      container.addChild(womanConductor10);

      appRef.current = app;
      animatedSpritesRef.current = [
        tchai,
        hearts,
        trumpetMan,
        clock,
        runner1,
        runner2,
        runner3,
        runner4,
        violin,
        womanConductor1,
        womanConductor2,
        womanConductor3,
        womanConductor4,
        womanConductor5,
        womanConductor6,
        womanConductor7,
        womanConductor8,
        womanConductor9,
        womanConductor10,
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
