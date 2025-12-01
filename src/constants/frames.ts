// 01 - Hungarian Dance

export const brahmsSpinFrames = Array.from({ length: 141 }, (_, i) => {
  const frameNumber = i.toString().padStart(3, "0");
  return `/brahms_spin/brahms_spin${frameNumber}.png`;
});

export const hungarianGirlFrames = Array.from({ length: 48 }, (_, i) => {
  const frameNumber = i.toString().padStart(2, "0");
  return `/hungarian_girl/hungarain_girl${frameNumber}.png`;
});

export const hungarianManFrames = Array.from({ length: 73 }, (_, i) => {
  const frameNumber = i.toString().padStart(2, "0");
  return `/hungarian_man/hungarian_man${frameNumber}.png`;
});

export const manConductorFrames = Array.from({ length: 70 }, (_, i) => {
  const frameNumber = i.toString().padStart(2, "0");
  return `/man_conductor/man_conductor${frameNumber}.png`;
});

export const redRunningmanFrames = Array.from({ length: 28 }, (_, i) => {
  const frameNumber = i.toString().padStart(2, "0");
  return `/red_runningman/red_runningman${frameNumber}.png`;
});

export const runningManFrames = Array.from({ length: 28 }, (_, i) => {
  const frameNumber = i.toString().padStart(2, "0");
  return `/running_man/running_man${frameNumber}.png`;
});

// 02 - Tchaikovsky Symphony

export const tchaiFrames = Array.from({ length: 48 }, (_, i) => {
  const frameNumber = i.toString().padStart(2, "0");
  return `/tchai/tchai${frameNumber}.png`;
});

export const heartsFrames = Array.from({ length: 24 }, (_, i) => {
  const frameNumber = i.toString().padStart(5, "0");
  return `/hearts/hearts.${frameNumber}.png`;
});

export const trumpetManFrames = Array.from({ length: 225 }, (_, i) => {
  const frameNumber = i.toString().padStart(5, "0");
  return `/trumpet_man_easing/trumpet_man_easing.${frameNumber}.png`;
});

export const clockFrames = Array.from({ length: 72 }, (_, i) => {
  const frameNumber = i.toString().padStart(5, "0");
  return `/clock/clock.${frameNumber}.png`;
});

export const runnerFrames = Array.from({ length: 100 }, (_, i) => {
  const frameNumber = i.toString().padStart(5, "0");
  return `/runner/runner.${frameNumber}.png`;
});

export const violinFrames = Array.from({ length: 25 }, (_, i) => {
  const frameNumber = i.toString().padStart(5, "0");
  return `/violin/violin.${frameNumber}.png`;
});

export const womanConductorFrames = Array.from({ length: 24 }, (_, i) => {
  const frameNumber = i.toString().padStart(2, "0");
  return `/conductor2_loop/conductor2_loop${frameNumber}.png`;
});

// 03 - Dvorak Symphony

export const landscapeFrames = Array.from({ length: 150 }, (_, i) => {
  const frameNumber = i.toString().padStart(3, "0");
  return `/landscape/landscape${frameNumber}.png`;
});

export const oxTrackFrames = Array.from({ length: 120 }, (_, i) => {
  const frameNumber = i.toString().padStart(5, "0");
  return `/ox+track/ox+track.${frameNumber}.png`;
});

export const stopwatchFrames = Array.from({ length: 40 }, (_, i) => {
  const frameNumber = i.toString().padStart(2, "0");
  return `/stopwatch/stopwatch${frameNumber}.png`;
});
