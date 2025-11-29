import { useEffect, useRef } from "react";

interface Props {
  src: string;
  playbackRate?: number;
  onTimeUpdate?: (currentTime: number) => void;
}

export function AudioPlayer({ src, playbackRate = 1, onTimeUpdate }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handler = () => {
      audioRef.current?.play();
      window.removeEventListener("click", handler);
    };

    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      onTimeUpdate?.(audio.currentTime);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = playbackRate;
  }, [playbackRate]);

  return <audio ref={audioRef} src={src} autoPlay loop />;
}
