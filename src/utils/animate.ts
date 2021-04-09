type Sign = -1 | 1;
type Timing = (number: number) => number;
type Draw = (progress: number) => void;

export const animate = (timing: Timing, draw: Draw, duration: number, sign: Sign = 1): void => {
  const start = performance.now();

  requestAnimationFrame(function animateFn(time) {
    let timeFraction = (time - start) / duration;

    if (timeFraction > 1) {
      timeFraction = 1;
    }

    const progress = timing(timeFraction);

    draw(progress * sign);

    if (timeFraction < 1) {
      requestAnimationFrame(animateFn);
    }
  });
};
