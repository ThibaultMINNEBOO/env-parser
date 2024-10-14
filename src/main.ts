type SchemaType = Record<string, "string" | "number" | "boolean">;

type EnvValues<T extends SchemaType> = {
  [K in keyof T]: T[K] extends "string"
    ? string
    : T[K] extends "number"
      ? number
      : T[K] extends "boolean"
        ? boolean
        : never;
};

export class Env<T extends SchemaType> {
  private constructor(private schema: T) {}

  /**
   * Create an instance of Env to get your environment variables which are type safe.
   *
   * @param schema key represents the name of your environment variable, value represents its type
   * @returns {Env<T>}
   */
  public static create<T extends SchemaType>(schema: T): Env<T> {
    return new Env<T>(schema);
  }

  /**
   * Get value of an environment variable.
   * If value is not defined, it will return the default value provided
   *
   * @param key name of environment variable
   * @param defaultValue (optional) value if environment variable is not defined
   * @returns
   */
  public get<K extends keyof T>(
    key: K,
    defaultValue?: EnvValues<T>[K],
  ): EnvValues<T>[K] {
    const value = process.env[key as string];
    if (value === undefined) {
      if (defaultValue === undefined) {
        throw new Error(
          `Environment variable ${key as string} is not defined and no default value was provided.`,
        );
      }
      return defaultValue;
    }

    switch (this.schema[key]) {
      case "string":
        return value as EnvValues<T>[K];
      case "number":
        if (isNaN(Number(value))) {
          throw new Error(
            `Environment variable ${key as string} is not a valid number.`,
          );
        }
        return Number(value) as EnvValues<T>[K];
      case "boolean":
        if (value.toLowerCase() === "true") return true as EnvValues<T>[K];
        if (value.toLowerCase() === "false") return false as EnvValues<T>[K];
        throw new Error(
          `Environment variable ${key as string} is not a valid boolean.`,
        );
      default:
        throw new Error(
          `Unsupported type for environment variable ${key as string}.`,
        );
    }
  }
}
