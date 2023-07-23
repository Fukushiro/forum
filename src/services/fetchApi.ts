import { AUTHORIZATION } from "./api";

export type nextFetchType = "force" | "noStore" | "revalidate";
interface fetchApiForceCache {
  type: "force";
}
interface fetchApiNoStore {
  type: "noStore";
}
interface fetchApiRevalidate {
  type: "revalidate";
  time: number;
}

// const baseUrl = "http://localhost:8080/";

export const fetchApi = createFetchApi("http://localhost:8080");

function createFetchApi(baseUrl: string) {
  return async function fetchApi(
    url: string,
    {
      type,
      data,
    }: {
      data: {
        method: "GET" | "POST" | "PUT" | "DELETE";
        body?: any;
      };
      type: fetchApiForceCache | fetchApiNoStore | fetchApiRevalidate;
    }
  ) {
    let options: RequestInit = {
      method: data.method,
      headers: {
        Authorization: AUTHORIZATION,
      },
    };
    if (!!data.body) {
      options.body = JSON.stringify(data.body);
    }

    if (type.type === "force") {
      options.cache = "force-cache";
    } else if (type.type === "noStore") {
      options.cache = "no-store";
    } else if (type.type === "revalidate") {
      options.next = { revalidate: type.time };
    }

    return fetch(baseUrl + url, options);
  };
}
