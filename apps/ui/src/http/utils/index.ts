export const api: <T>(...args: Parameters<typeof fetch>) => Promise<T> = async (
  input,
  init,
) => {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.json();
};
