import { Env } from '..';
import { wrapCorsHeader } from "../corsHelper";
import { json } from "itty-router-extras";

import { IVenta } from './ventas';
import { ILibro } from "../Libro";


export const mockLibros: ILibro[] = [
  {
    isbn: "9788498723113",
    genero: "Ciencia ficción",
    titulo: "Ender el xenoxida",
    autor: "Orson Scott Card",
    editorial: "B DE BOLSILLO (EDICIONES B)",
    description:
      "Lusitania es único en la galaxia. Un planeta donde coexisten tres especies inteligentes: los cerdis, que evolucionaron en el mismo planeta; los humanos, que llegaron como colonizadores; y la Reina Colmena y sus Insectores, llevados por el joven Ender unos años atrás.\n\nEl planeta ha sido condenado por el Consejo Estelar a causa de la descolada, un virus letal para los humanos e imprescindible para la biología de los cerdis. Jane, la inteligencia artificial aliada de Ender, ha salvado Lusitania interfiriendo con la Flota Estelar y creando un insondable misterio a escala galáctica.\n\nEn el planeta Sendero, Quing-jao tiene el encargo de descubrir la desaparición de la Flota Estelar, lo que pone en peligro la existencia de Jane y la supervivencia de las tres especies inteligentes conocidas.",
    precio: "5093",
    cover: "https://covers.openlibrary.org/b/id/7828592-L.jpg",
  },
  {
    isbn: "9788445005125",
    genero: "Ciencia ficción",
    titulo: "¿Sueñan los androides con ovejas eléctricas?",
    autor: "Philip K. Dick",
    editorial: "Minotauro",
    description:
      "En el año 2021 la guerra mundial ha exterminado a millones de personas. Los supervivientes codician cualquier criatura viva, y aquellos que no pueden permitirse pagar por ellas se ven obligados a adquirir réplicas increíblemente realistas. Las empresas fabrican incluso seres humanos. Rick Deckard es un cazarrecompensas cuyo trabajo es encontrar androides rebeldes y retirarlos, pero la tarea no será tan sencilla cuando tenga que enfrentarse a los nuevos modelos Nexus-6, prácticamente indistinguibles de los seres humanos.",
    cover:
      "https://http2.mlstatic.com/D_NQ_NP_641763-MLA46366242335_062021-O.webp",
    precio: "1960",
  },
  {
    isbn: "9788445000502",
    genero: "Ciencia ficción",
    titulo: "Tiempo desarticulado",
    autor: "Philip K. Dick",
    editorial: "Minotauro",
    description:
      "Ragle Gumm es un hombre corriente con una vida corriente. Pero tiene una manera de ganarse la vida de lo más singular: cada día participa en el concurso diario del periódico local «¿Dónde estará la próxima vez el hombrecito verde?», y siempre gana. Ha ganado durante los tres últimos años, sin excepción.\n\nSin embargo, esta idílica existencia cambiará de manera drástica cuando Ragle Gumm sienta la inquietud de salir del pueblo, cosa que no ha hecho nunca, y se dé cuenta de que una autoridad desconocida se lo impide.\n\nPoco a poco, Ragle empieza a sospechar que su mundo no es más que una ilusión, construida a su alrededor con el único propósito de mantenerlo dócil y feliz. Pero si está en lo cierto, ¿cómo es el mundo exterior y qué hace en realidad cada día cuando cree que intenta adivinar dónde estará el hombrecito verde? .",
    cover:
      "https://http2.mlstatic.com/D_NQ_NP_621247-MLA28206685585_092018-O.webp",
    precio: "3400",
  },
  {
    isbn: "9788492412143",
    genero: "Otro",
    titulo: "Cuentos De Imaginacion Y Misterio",
    autor: "Edgar Allan Poe",
    description:
      "Hacia 1917, el eximio artista irlandés Harry Clarke emprendió uno de los trabajos que determinaron su fama: la ilustración de Cuentos de imaginación y misterio, una antología de los más altos relatos de Poe preparada por la editorial Harrap. La edición, publicada en Londres en 1919, fue reconocida inmediatamente como una de las joyas bibliográficas de la época. Desde entonces, las estampas de Clarke siguen ejerciendo un extraño magnetismo, fruto de una exquisita ejecución que hizo honor a las sublimes historias que las inspiraron. Libros del Zorro Rojo recupera esta obra mítica, con traducción de Julio Cortázar y un notable prefacio de su autoría.",
    cover:
      "https://http2.mlstatic.com/D_NQ_NP_2X_633110-MLA46951751341_082021-F.webp",
    precio: "6880",
    editorial: "Zorro Rojo",
    otroGenero: "Terror",
  }
];

export const mockVentas: IVenta[] = [
  {
    articles: [
      {
        isbn: "9780140328721",
        cantidad: 3,
      },
    ],
    timestamp: "2021-09-01",
  },
  {
    articles: [
      {
        isbn: "9788445002698",
        cantidad: 6,
      },
      {
        isbn: "9788445005125",
        cantidad: 3,
      },
      {
        isbn: "9788498723113",
        cantidad: 1,
      },
    ],
    timestamp: "2021-09-02",
  },
];

export const resetData = async (request: Request, { STORE }: Env) => {
  try {
    await STORE.put("libros", JSON.stringify(mockLibros));
    await STORE.put("ventas", JSON.stringify(mockVentas));
    console.log("Data reseted");

    return wrapCorsHeader(
      json({ message: "Datos reseteados" }, { status: 200 })
    );
  } catch {
    return wrapCorsHeader(
      json({ message: "Error al crear libros" }, { status: 500 })
    );
  }
};
