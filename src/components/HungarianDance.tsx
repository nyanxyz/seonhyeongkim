import { useState } from "react";
import {
  brahmsSpinFrames,
  hungarianGirlFrames,
  hungarianManFrames,
  manConductorFrames,
  runningManFrames,
} from "../constants/frames";
import { useTick } from "../hooks/useTick";
import { AudioPlayer } from "./AudioPlayer";
import { BPMSlider } from "./BPMSlider";
import { FramePlayer } from "./FramePlayer";

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
};

export function HungarianDance() {
  const [bpm, setBpm] = useState(90);
  const [audioCurrentTime, setCurrentTime] = useState(0);

  const fps = 24 * Math.pow(bpm / 90, 1.3);
  const audioRate = bpm / 90;
  const gradientOpacity = Math.min(Math.max((bpm - 20) / 200, 0), 1);

  const tick = useTick(fps);

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
            className="absolute inset-0 w-full h-full object-cover"
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

          <FramePlayer
            frames={brahmsSpinFrames}
            tick={tick}
            className="absolute top-[132px] left-[106px] w-[445px]"
          />
          <img
            src="/brahms_frame/brahms_frame.png"
            className="absolute top-[44px] left-[5px] w-[638px]"
          />

          <FramePlayer
            frames={manConductorFrames}
            tick={tick}
            className="absolute top-[79px] -left-[734px] w-[1564px]"
          />

          <img
            src="/runningtrack_circle/runningtrack_circle.png"
            className="absolute -bottom-[54px] right-[181px] w-[584px]"
          />
          <FramePlayer
            frames={runningManFrames}
            tick={tick}
            className="absolute bottom-[84px] right-[348px] w-[263px]"
          />

          <img
            src="/hungarian_man_shadow/hungarian_man_shadow.png"
            className="absolute -bottom-[6px] right-[30px] w-[269px]"
          />
          <FramePlayer
            frames={hungarianManFrames}
            tick={tick}
            className="absolute bottom-[4px] right-[7px] w-[365px]"
          />

          <FramePlayer
            frames={hungarianGirlFrames}
            tick={tick}
            offset={28}
            className="absolute inset-0 m-auto w-[893px] rotate-[71deg]"
          />
          {/* <FramePlayer
            frames={hungarianGirlFrames}
            tick={tick}
            offset={24}
            className="absolute inset-0 m-auto w-[792px] rotate-[58deg]"
          />
          <FramePlayer
            frames={hungarianGirlFrames}
            tick={tick}
            offset={20}
            className="absolute inset-0 m-auto w-[691px] rotate-[45deg]"
          />
          <FramePlayer
            frames={hungarianGirlFrames}
            tick={tick}
            offset={16}
            className="absolute inset-0 m-auto w-[591px] rotate-[33deg]"
          />
          <FramePlayer
            frames={hungarianGirlFrames}
            tick={tick}
            offset={12}
            className="absolute inset-0 m-auto w-[490px] rotate-[21deg]"
          />
          <FramePlayer
            frames={hungarianGirlFrames}
            tick={tick}
            offset={8}
            className="absolute inset-0 m-auto w-[389px] rotate-[9deg]"
          />
          <FramePlayer
            frames={hungarianGirlFrames}
            tick={tick}
            offset={4}
            className="absolute inset-0 m-auto w-[294px] -rotate-[4deg]"
          />
          <FramePlayer
            frames={hungarianGirlFrames}
            tick={tick}
            className="absolute inset-0 m-auto w-[188px] -rotate-[16deg]"
          /> */}
        </div>

        <BPMSlider tick={tick} value={bpm} onValueChange={setBpm} />
      </div>
    </>
  );
}
