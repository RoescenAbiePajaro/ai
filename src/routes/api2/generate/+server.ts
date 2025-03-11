import { json, type RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async () => {
    return json(["hello","world"]);
  };

  export const POSt: RequestHandler = async () => {
    return json(["hello","world","from","post"]);
  };