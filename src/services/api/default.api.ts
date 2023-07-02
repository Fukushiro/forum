export interface RetornoPadrao<T> {
  response: any;
  funcionou: boolean;
  message: string;
  data: T | null;
}

export function success(RESPONSE: any, message: string = "") {
  return {
    response: RESPONSE,
    funcionou: true,
    data: RESPONSE.data,
    message: message,
  };
}
export function falhaSemRetorno(message: string = "") {
  return { response: null, funcionou: false, data: null, message: message };
}

export function falhaComRetorno(RESPONSE: any, message: string = "") {
  return {
    response: RESPONSE,
    funcionou: false,
    data: RESPONSE.data,
    message: message,
  };
}
