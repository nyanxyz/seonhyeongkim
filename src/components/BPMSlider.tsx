import { Slider, SliderRange, SliderThumb, SliderTrack } from "@radix-ui/react-slider";
import { redRunningmanFrames } from "../constants/frames";
import { FramePlayer } from "./FramePlayer";

interface Props {
  value?: number;
  onValueChange?: (value: number) => void;
}

export function BPMSlider({ value = 90, onValueChange }: Props) {
  const fps = 24 * (value / 90);

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
          <FramePlayer
            frames={redRunningmanFrames}
            fps={fps}
            className="w-[60px] max-w-fit relative -left-[6px]"
          />
        </SliderThumb>
      </Slider>

      <div className="w-full flex justify-between font-antarctica font-bold italic text-[13px] px-[5px] text-black">
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
