const DEFAULT_TIMEOUT = 10_000;

export const api: <T>(...args: Parameters<typeof fetch>) => Promise<T> = async (
  input,
  init,
) => {
  const abortController = new AbortController();
  const timeoutSignal = AbortSignal.timeout(DEFAULT_TIMEOUT);

  timeoutSignal.addEventListener("abort", () => {
    abortController.abort();
  });

  init?.signal?.addEventListener("abort", () => {
    abortController.abort();
  });

  const response = await fetch(input, {
    ...init,
    signal: abortController.signal,
  });

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.json();
};
