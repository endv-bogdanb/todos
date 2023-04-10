export class HttpError extends Error {
  public readonly name = "HttpError";
  public readonly url: string = "";

  constructor(
    public readonly message: string,
    public readonly type:
      | "Timeout"
      | "Aborted"
      | "Validation"
      | "Parse"
      | "Unknown"
      | "Http",
    public readonly status: number,
    url: string | URL,
    public readonly recoverable: boolean = false
  ) {
    super(message);

    this.url = `${url}`;

    if (import.meta.env.DEV) {
      this.report();
    }
  }

  static isHttpError = (e: unknown): e is HttpError => {
    if (e instanceof Error) {
      return e.name === "HttpError";
    }
    return false;
  };

  static toHttpError = (e: unknown): HttpError => {
    if (this.isHttpError(e)) {
      return e;
    }
    return new HttpError(`Unexpected error occured ${e}`, "Unknown", 500, "");
  };

  private report = () => {
    console.error({
      name: this.name,
      type: this.type,
      message: this.message,
      url: this.url,
      recoverable: this.recoverable,
    });
  };
}
