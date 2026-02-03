export interface Orden {
  orderID: number;
  shipName: string;
  shipVia: number;
  freight:number;
 
}

export interface APIResponse {
  exito: boolean;
  message?: string;
  data?: any;
}