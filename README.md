# Env wrapper for NodeJS

```
npm install @thibaultminneboo/env-parser
```

1. Examples

```ts
import { Env } from "@thibaultminneboo/env-parser";

const env = Env.create({
  PORT: "number",
  FOLLOW_REDIRECTS: "boolean",
  DATABASE_URL: "string"
});

console.log(env.get("PORT")); // throws error if PORT is not defined
console.log(env.get("DATABASE_URL", "test")); // show test if DATABASE_URL is not defined
console.log(env.get("INVALID")); // throws error because INVALID environment variable is not supported by your schema
```
