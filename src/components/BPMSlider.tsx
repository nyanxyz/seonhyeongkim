import { Slider, SliderRange, SliderThumb, SliderTrack } from "@radix-ui/react-slider";
import { redRunningmanFrames } from "../constants/RedRunningman";
import { FramePlayer } from "./FramePlayer";

interface Props {
  value?: number;
  onValueChange?: (value: number) => void;
}

export function BPMSlider({ value = 90, onValueChange }: Props) {
  const fps = 24 * (value / 90);

  return (
    <div className="h-46 px-16 flex flex-col space-y-4 pt-[66px]">
      <Slider
        value={[value]}
        onValueChange={(val) => onValueChange?.(val[0])}
        min={20}
        max={200}
        step={1}
        className="relative flex items-center select-none touch-none px-[15px] -mx-[15px]"
      >
        <SliderTrack className="relative h-7.5 w-full bg-[#DFDFDF] shadow-[0px_4px_4px_0px_#00000040_inset]">
          <SliderRange className="absolute h-full bg-[linear-gradient(90deg,#EFEFEF_0%,rgba(255,75,33,0.5)_100%)]" />
        </SliderTrack>
        <SliderThumb className="flex size-7.5 items-center justify-center outline-none cursor-pointer">
          <FramePlayer
            frames={redRunningmanFrames}
            fps={fps}
            className="w-[103px] h-[124px] max-w-fit relative -left-1.5"
          />
        </SliderThumb>
      </Slider>

      <div className="w-full flex justify-between font-antarctica font-bold italic text-[24px] px-2.5 text-black">
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
