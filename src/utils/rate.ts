export const calculateAnimationSpeed = (bpm: number) => bpm / 90;

export const calculateAudioRate = (bpm: number) => {
  if (bpm < 90) {
    return Math.sqrt(bpm / 90);
  }
  return bpm / 90;
};
