export const calculateAnimationSpeed = (bpm: number) => {
  if (bpm <= 90) {
    return bpm / 90 / 2;
  }
  if (bpm <= 150) {
    return bpm / 90 / 1.5;
  }
  return bpm / 90;
};

export const calculateAudioRate = (bpm: number) => {
  if (bpm < 90) {
    return Math.sqrt(bpm / 90);
  }
  return bpm / 90;
};
