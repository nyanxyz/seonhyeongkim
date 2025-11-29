import { useState } from "react";
import backgroundGradient from "../assets/background-gradient.png";
import brahmsFrame from "../assets/brahms_frame/brahms_frame.png";
import hungarianManShadow from "../assets/hungarian_man_shadow/hungarian_man_shadow.png";
import runningtrackCircle from "../assets/runningtrack_circle/runningtrack_circle.png";
import { brahmsSpinFrames } from "../constants/BrahmsSpin";
import { hungarianGirlFrames } from "../constants/HungarianGirl";
import { hungarianManFrames } from "../constants/HungarianMan";
import { manConductorFrames } from "../constants/ManConductor";
import { runningManFrames } from "../constants/RunningMan";
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

  const fps = 24 * (bpm / 90);
  const audioRate = bpm / 90;
  const gradientOpacity = Math.min(Math.max((bpm - 20) / 200, 0), 1);

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
            src={backgroundGradient}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: gradientOpacity }}
          />

          <div className="absolute top-[47px] left-[62px] font-antarctica font-bold text-[64px] text-black">
            {formatTime(audioCurrentTime)}
          </div>
          <div className="absolute top-[47px] left-0 right-0 mx-auto w-fit font-antarctica font-bold text-[64px] text-black">
            HUNGARIAN DANCE NO.5
          </div>
          <div className="absolute top-[47px] right-[98px] font-antarctica font-bold text-[64px] text-black">
            J. BRAHMS
          </div>

          <div className="absolute bottom-[57px] left-[61px] font-antarctica text-[24px] text-black">
            “Hungarian Dance No. 5” by Fulda Symphony Orchestra is licensed under CC BY.
          </div>

          <FramePlayer
            frames={brahmsSpinFrames}
            fps={fps}
            className="absolute top-[254px] left-[186px] w-[780px]"
          />
          <img src={brahmsFrame} className="absolute top-[84px] left-[8px] w-[1120px]" />

          <FramePlayer
            frames={manConductorFrames}
            fps={fps}
            className="absolute top-[152px] -left-[1288px] w-[2743px]"
          />

          <img
            src={runningtrackCircle}
            className="absolute -bottom-[104px] right-[317px] w-[1024px]"
          />
          <FramePlayer
            frames={runningManFrames}
            fps={fps}
            className="absolute bottom-[162px] right-[611px] w-[462px]"
          />

          <img
            src={hungarianManShadow}
            className="absolute -bottom-[12px] right-[53px] w-[471px]"
          />
          <FramePlayer
            frames={hungarianManFrames}
            fps={fps}
            className="absolute bottom-[8px] right-[13px] w-[640px]"
          />

          <FramePlayer
            frames={hungarianGirlFrames}
            fps={fps}
            offset={28}
            className="absolute inset-0 m-auto w-[1566px] rotate-[71deg]"
          />
          <FramePlayer
            frames={hungarianGirlFrames}
            fps={fps}
            offset={24}
            className="absolute inset-0 m-auto w-[1389px] rotate-[58deg]"
          />
          <FramePlayer
            frames={hungarianGirlFrames}
            fps={fps}
            offset={20}
            className="absolute inset-0 m-auto w-[1213px] rotate-[45deg]"
          />
          <FramePlayer
            frames={hungarianGirlFrames}
            fps={fps}
            offset={16}
            className="absolute inset-0 m-auto w-[1036px] rotate-[33deg]"
          />
          <FramePlayer
            frames={hungarianGirlFrames}
            fps={fps}
            offset={12}
            className="absolute inset-0 m-auto w-[860px] rotate-[21deg]"
          />
          <FramePlayer
            frames={hungarianGirlFrames}
            fps={fps}
            offset={8}
            className="absolute inset-0 m-auto w-[683px] rotate-[9deg]"
          />
          <FramePlayer
            frames={hungarianGirlFrames}
            fps={fps}
            offset={4}
            className="absolute inset-0 m-auto w-[507px] -rotate-[4deg]"
          />
          <FramePlayer
            frames={hungarianGirlFrames}
            fps={fps}
            className="absolute inset-0 m-auto w-[330px] -rotate-[16deg]"
          />
        </div>

        <BPMSlider value={bpm} onValueChange={setBpm} />
      </div>
    </>
  );
}
