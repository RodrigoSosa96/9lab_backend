export interface ILibro {
  isbn: string;
  genero: string;
  titulo: string;
  autor: string;
  editorial: string;
  description: string;
  precio: string;
  cover: string;
  otroGenero?: string;
}

export class Libro {
  isbn: string;
  genero: string;
  titulo: string;
  autor: string;
  editorial: string;
  description: string;
  precio: string;
  cover: string;
  otroGenero?: string;
  constructor(
    isbn: string,
    genero: string,
    titulo: string,
    autor: string,
    editorial: string,
    description: string,
    precio: string,
    cover: string,
    otroGenero?: string
  ) {
    this.isbn = isbn;
    this.genero = genero;
    this.titulo = titulo;
    this.autor = autor;
    this.editorial = editorial;
    this.description = description;
    this.precio = precio;
    this.cover = cover;
    this.otroGenero = otroGenero;
  }

  static fromJSON(json: Libro): Libro {
    return new Libro(
      json.isbn,
      json.genero,
      json.titulo,
      json.autor,
      json.editorial,
      json.description,
      json.precio,
      json.cover
    );
  }

  toJSON(): ILibro {
    return {
      isbn: this.isbn,
      genero: this.genero,
      titulo: this.titulo,
      autor: this.autor,
      editorial: this.editorial,
      description: this.description,
      precio: this.precio,
      cover: this.cover,
    };
  }
}
