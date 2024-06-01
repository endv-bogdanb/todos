import envVar from "env-var";

const DEFAULT_PORT = 3000;

export const PORT = envVar.get("PORT").default(DEFAULT_PORT).asPortNumber();
