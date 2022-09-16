import { Request } from "itty-router";
import { Env } from "..";
import { json } from "itty-router-extras";
import { wrapCorsHeader } from "../corsHelper";

import { ILibro, Libro } from "../Libro";

export const getLibros = async (request: Request, { STORE }: Env) => {
  const isbn = request.params?.isbn;
  const libros = (await STORE.get("libros", "json")) as ILibro[];
  if (!isbn) {
    return wrapCorsHeader(json(libros, { status: 200 }));
  }
  const libro = libros.find((book) => book.isbn === isbn);
  if (!libro) {
    return wrapCorsHeader(json({ error: "Not found" }, { status: 404 }));
  }
  return wrapCorsHeader(json(libro, { status: 200 }));
};

export const postLibros = async (request: Request, { STORE }: Env) => {
  try {
    const content = await request.json!();
    const libros = (await STORE.get("libros", "json")) as ILibro[];
    const nuevoLibro = Libro.fromJSON(content);

    libros.push(nuevoLibro.toJSON());
    await STORE.put("libros", JSON.stringify(libros));
    return wrapCorsHeader(json(nuevoLibro.toJSON(), { status: 201 }));
  } catch (err) {
    if (err instanceof TypeError) {
      return wrapCorsHeader(json({ error: "Invalid JSON" }, { status: 400 }));
    }
    return wrapCorsHeader(
      json({ error: "Internal Server Error" }, { status: 500 })
    );
  }
};

export const putLibros = async (request: Request, { STORE }: Env) => {
  try {
    const isbn = request.params?.isbn;
    const content = await request.json!();

    const libros = (await STORE.get("libros", "json")) as ILibro[];
    const libro = libros.find((book) => book.isbn === isbn);
    if (!libro) {
      return wrapCorsHeader(json({ error: "Not found" }, { status: 404 }));
    }
    const nuevoLibro = Libro.fromJSON(content);
    const index = libros.findIndex((book) => book.isbn === isbn);
    libros[index] = {
      ...libro,
      ...nuevoLibro.toJSON(),
    };
    await STORE.put("libros", JSON.stringify(libros));

    return wrapCorsHeader(json(libros[index], { status: 200 }));
  } catch (err) {
    if (err instanceof TypeError) {
      return wrapCorsHeader(json({ error: "Invalid JSON" }, { status: 400 }));
    }
    return wrapCorsHeader(
      json({ error: "Internal Server Error" }, { status: 500 })
    );
  }
};

export const deleteLibros = async (request: Request, { STORE }: Env) => {
  const isbn = request.params?.isbn;
  const libros = (await STORE.get("libros", "json")) as ILibro[];
  const libro = libros.find((book) => book.isbn === isbn);
  if (!libro) {
    return wrapCorsHeader(json({ error: "Not found" }, { status: 404 }));
  }
  const index = libros.findIndex((book) => book.isbn === isbn);
  libros.splice(index, 1);
  await STORE.put("libros", JSON.stringify(libros));
  return wrapCorsHeader(json(libro, { status: 200 }));
};
