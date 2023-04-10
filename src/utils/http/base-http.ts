import { HttpError } from "./http-error";
import { BaseHttpRequest } from "./http.types";

export class BaseHttp {
  protected static call = async <T>(request: BaseHttpRequest) => {
    return new Promise<T>((resolve, reject) => {
      try {
        let handled = false;
        let headers: HeadersInit;

        const { method = "GET", url, body, timeout = 10000, signal } = request;

        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        xhr.timeout = timeout;
        xhr.responseType = "blob";

        signal?.addEventListener("abort", () => xhr.abort(), true);

        Object.entries(request.headers ?? this.headers).forEach(
          ([name, value]) => xhr.setRequestHeader(name, value)
        );

        if (request.onProgress) {
          xhr.upload.onprogress = (event) => {
            const { total, loaded } = event;
            const percentage = this.percentage(event);
            const ctx = { percentage, total, loaded };
            request.onProgress?.(ctx);
          };
        }

        xhr.ontimeout = () => {
          handled = true;
          const error = new HttpError("Network timeout", "Timeout", 408, url);
          reject(error);
        };

        xhr.onabort = () => {
          handled = true;
          const error = new HttpError("Aborted", "Aborted", 299, url);
          reject(error);
        };

        xhr.onerror = () => {
          handled = true;
          console.log("onerror");
          const error = new HttpError(
            `Unexpected error occured`,
            "Unknown",
            500,
            url
          );
          reject(error);
        };

        xhr.onloadend = () => {
          if (!handled) {
            reject(
              new HttpError(
                `Unexpected error occured ${new Error(
                  "Operation not handled"
                )}`,
                "Unknown",
                500,
                url
              )
            );
          }
        };

        xhr.onreadystatechange = () => {
          if (xhr.status === 0) {
            console.warn(
              " Ignore onreadystatechange ",
              xhr.status,
              xhr.statusText,
              xhr.responseURL
            );
            return;
          }

          switch (xhr.readyState) {
            case XMLHttpRequest.UNSENT: {
              // NOTE: ignored
              break;
            }
            case XMLHttpRequest.OPENED: {
              // NOTE: ignored
              break;
            }
            case XMLHttpRequest.HEADERS_RECEIVED: {
              headers = Object.fromEntries(
                xhr
                  .getAllResponseHeaders()
                  .split("\u000d\u000a") // '\n'
                  .map((line) => line.split("\u003a\u0020")) // ": "
                  .filter(
                    (pair) => pair[0] !== undefined && pair[1] !== undefined
                  )
              );
              break;
            }
            case XMLHttpRequest.LOADING: {
              // NOTE: ignored
              break;
            }
            case XMLHttpRequest.DONE: {
              handled = true;
              const { status, statusText } = xhr;

              const init: ResponseInit = { status, statusText, headers };
              const response = new Response(xhr.response, init);

              this.parse(url, response).then(resolve).catch(reject);
              break;
            }
            default: {
              handled = false;
              break;
            }
          }
        };

        xhr.send(body as XMLHttpRequestBodyInit);
      } catch (error) {
        reject(HttpError.toHttpError(error));
      }
    });
  };

  private static get headers() {
    return {
      accept: "application/json",
      "content-type": "application/json",
    };
  }

  private static parse = async (url: URL | string, response: Response) => {
    try {
      const blob = await response.blob();

      if (!response.ok) {
        const text = this.isText(blob) ? await blob.text() : "";
        throw new HttpError(
          text,
          response.status === 422 ? "Validation" : "Http",
          response.status,
          url
        );
      }

      if (this.isBlob(blob)) {
        return blob;
      }

      const text = await blob.text();

      if (text.length === 0) {
        throw new HttpError(
          "Invalid response length",
          "Http",
          response.status,
          url
        );
      }

      try {
        if (!this.isJson(blob)) {
          return text;
        }
        return JSON.parse(text);
      } catch (error) {
        throw new HttpError(
          `Failed to parse response: ${error}`,
          "Parse",
          response.status,
          url
        );
      }
    } catch (error) {
      throw HttpError.toHttpError(error);
    }
  };

  private static isText = (blob: Blob) =>
    blob.type.startsWith("text") || this.isJson(blob);

  private static isJson = (blob: Blob) =>
    blob.type.startsWith("application/json");

  private static isBlob = (blob: Blob) =>
    !blob.type.startsWith("text") && !blob.type.startsWith("application/json");

  private static percentage = (event: ProgressEvent) => {
    const percentage = (event.loaded / event.total) * 100;
    return Math.min(Math.round(percentage), 100);
  };
}
