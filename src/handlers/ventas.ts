import { Request } from "itty-router";
import { Env } from "..";
import { wrapCorsHeader } from "../corsHelper";
import { json } from "itty-router-extras";

export interface IVenta {
  articles: {
    isbn: string;
    cantidad: number;
  }[];
  timestamp: string;
}
export const postVentas = async (request: Request, { STORE }: Env) => {
  try {
    const nuevoVenta = await request.json!();
    const ventas = ((await STORE.get("ventas", "json")) ?? []) as IVenta[];
    ventas.push(nuevoVenta);

    await STORE.put("ventas", JSON.stringify(ventas));
    return wrapCorsHeader(json(nuevoVenta, { status: 201 }));
  } catch (err) {
    console.error(err);
    if (err instanceof TypeError) {
      return wrapCorsHeader(json({ error: "Invalid JSON" }, { status: 400 }));
    }
    return wrapCorsHeader(
      json({ error: "Internal Server Error" }, { status: 500 })
    );
  }
};
