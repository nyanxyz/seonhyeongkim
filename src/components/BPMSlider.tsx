import { Slider, SliderRange, SliderThumb, SliderTrack } from "@radix-ui/react-slider";
import * as PIXI from "pixi.js";
import { useEffect, useRef } from "react";
import { redRunningmanFrames } from "../constants/frames";
import { calculateAnimationSpeed } from "../utils/rate";

interface Props {
  value?: number;
  onValueChange?: (value: number) => void;
}

export function BPMSlider({ value = 90, onValueChange }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spriteRef = useRef<PIXI.AnimatedSprite | null>(null);

  useEffect(() => {
    const init = async () => {
      const app = new PIXI.Application();
      await app.init({ width: 60, height: 72, backgroundAlpha: 0 });

      containerRef.current?.appendChild(app.canvas);

      const container = new PIXI.Container();
      app.stage.addChild(container);

      await PIXI.Assets.load(redRunningmanFrames);
      const redRunningmanTextures = redRunningmanFrames.map((f) => PIXI.Assets.cache.get(f));

      const redRunningman = new PIXI.AnimatedSprite(redRunningmanTextures);
      redRunningman.setSize(60, 72);
      redRunningman.position.set(0, 0);
      redRunningman.animationSpeed = 1;
      redRunningman.loop = true;
      redRunningman.play();

      container.addChild(redRunningman);
      spriteRef.current = redRunningman;
    };
    init();
  }, []);

  useEffect(() => {
    if (spriteRef.current) {
      spriteRef.current.animationSpeed = calculateAnimationSpeed(value);
    }
  }, [value]);

  return (
    <div className="relative h-[96px] px-[36px] flex flex-col space-y-[8px] pt-[32px] bg-white">
      <Slider
        value={[value]}
        onValueChange={(val) => onValueChange?.(val[0])}
        min={20}
        max={200}
        step={1}
        className="relative flex items-center select-none touch-none px-[8px] -mx-[8px]"
      >
        <SliderTrack className="relative h-[16px] w-full bg-[#DFDFDF] shadow-[0px_2px_2px_0px_#00000040_inset]">
          <SliderRange className="absolute h-full bg-[linear-gradient(90deg,#EFEFEF_0%,rgba(255,75,33,0.5)_100%)]" />
        </SliderTrack>
        <SliderThumb className="flex size-[16px] items-center justify-center outline-none cursor-pointer">
          <div ref={containerRef} className="w-[60px] h-[72px] -ml-1" />
        </SliderThumb>
      </Slider>

      <div className="w-full flex justify-between font-antarctica font-bold italic text-[17px] px-[5px] text-black">
        <span>Largo</span>
        <span>Adagio</span>
        <span>Andante</span>
        <span>Moderato</span>
        <span>Allegro</span>
        <span>Presto</span>
      </div>
    </div>
  );
}
