export {};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>> & {
      push: (event: Record<string, unknown>) => number;
    };
  }
}
