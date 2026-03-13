export const delay: (ms: number) => Promise<null> = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
