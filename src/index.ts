import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import being from "./being";

const app = new Elysia()
  .use(swagger())
  .use(being)
  //   .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
