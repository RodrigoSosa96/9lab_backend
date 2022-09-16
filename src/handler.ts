import { Env } from ".";
import { deleteLibros, getLibros, postLibros, putLibros } from './handlers/libros';
import { createLibros, createVentas } from './handlers/mockData';
import { postVentas } from './handlers/ventas';
import { handleCors } from './corsHelper'
import { ThrowableRouter } from 'itty-router-extras';

const router = ThrowableRouter()
router.options('*',  handleCors())

router
  .get("/books/:isbn?", getLibros)
  .post("/books", postLibros)
  .put("/books/:isbn", putLibros)
  .delete("/books/:isbn", deleteLibros)
  .post("/ventas", postVentas)
  .get("/reset/ventas", createVentas)
  .get("/reset/libros", createLibros)
  .get("*", () => new Response("Not found", { status: 404 }));


export const handleRequest = (
  request: Request,
  env: Env,
  ctx: ExecutionContext
) => router.handle(request, env, ctx);
