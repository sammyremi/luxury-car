export const PORSCHE_FRAME_COUNT = 240;
export const EV_FRAME_COUNT = 240;

function generateFramePaths(folder: string, count: number): string[] {
  const paths: string[] = [];
  for (let i = 1; i <= count; i++) {
    const paddedIndex = String(i).padStart(4, "0");
    paths.push(`/${folder}/frame_${paddedIndex}.webp`);
  }
  return paths;
}

export const porscheFrames = generateFramePaths("911gt-frames", PORSCHE_FRAME_COUNT);
export const evFrames = generateFramePaths("ev-frames", EV_FRAME_COUNT);
