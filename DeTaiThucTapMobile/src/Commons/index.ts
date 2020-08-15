export const Sleep = (second: number) =>
  new Promise((resolve) => setTimeout(resolve, second));
