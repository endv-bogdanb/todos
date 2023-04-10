import { BaseHttp } from "./base-http";
import { BaseHttpRequest } from "./http.types";

export interface HttpRequest extends Omit<BaseHttpRequest, "method"> {}

export class Http extends BaseHttp {
  protected static get = async <T>(
    request: Omit<HttpRequest, "onProgress">
  ) => {
    return this.call<T>({ ...request, method: "GET" });
  };

  protected static post = async <T>(
    request: Omit<HttpRequest, "onProgress">
  ) => {
    return this.call<T>({
      ...request,
      body: JSON.stringify(request.body),
      method: "POST",
    });
  };

  protected static put = async <T>(
    request: Omit<HttpRequest, "onProgress">
  ) => {
    return this.call<T>({
      ...request,
      body: JSON.stringify(request.body),
      method: "PUT",
    });
  };

  protected static patch = async <T>(
    request: Omit<HttpRequest, "onProgress">
  ) => {
    return this.call<T>({
      ...request,
      body: JSON.stringify(request.body),
      method: "PATCH",
    });
  };

  protected static delete = async <T>(
    request: Omit<HttpRequest, "onProgress">
  ) => {
    return this.call<T>({ ...request, method: "DELETE" });
  };

  protected static upload = async <T>(
    request: HttpRequest & { method?: "POST" | "PUT" }
  ) => {
    return this.call<T>({ method: "POST", headers: {}, ...request });
  };

  public static download = (blob: Blob, name?: string) => {
    const anchor = document.createElement("a");

    anchor.setAttribute("style", "display:none");
    anchor.hidden = true;
    anchor.href = URL.createObjectURL(blob);
    anchor.target = "_blank";

    if (name) {
      anchor.download = name;
    }

    anchor.onclick = () => {
      requestAnimationFrame(() => {
        URL.revokeObjectURL(anchor.href);
        document.body.removeChild(anchor);
      });
    };

    document.body.appendChild(anchor);

    requestAnimationFrame(() => {
      anchor.click();
    });
  };
}
