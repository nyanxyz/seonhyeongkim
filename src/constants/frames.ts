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
