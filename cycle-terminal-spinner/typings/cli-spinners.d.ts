declare module 'cli-spinners' {
  export interface Spinner {
    interval: number;
    frames: string;
  }

  export const dots: Spinner;
}
