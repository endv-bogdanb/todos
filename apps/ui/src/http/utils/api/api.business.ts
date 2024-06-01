const DEFAULT_TIMEOUT = 10_000;

export type CallRequestInit = RequestInit & { timeout?: number };

export const call = async (
  input: string | URL | Request,
  init: CallRequestInit,
): Promise<Response> => {
  const abortController = new AbortController();
  const timeoutSignal = AbortSignal.timeout(init.timeout ?? DEFAULT_TIMEOUT);

  timeoutSignal.addEventListener("abort", () => {
    abortController.abort();
  });

  init.signal?.addEventListener("abort", () => {
    abortController.abort();
  });

  return fetch(input, { ...init, signal: abortController.signal });
};

export const parse = async (response: Response) => {
  const blob = await response.blob();

  const isText = blob.type.startsWith("text/plain");
  const isJson = blob.type.startsWith("application/json");

  if (isText || isJson) {
    const text = await blob.text();
    // eslint-disable-next-line no-ternary
    return isJson ? (JSON.parse(text) as unknown) : text;
  }

  return blob;
};
