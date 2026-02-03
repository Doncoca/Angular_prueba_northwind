export interface Order {
  OrderID: number;
  ShipName: string;
  ShipVia: number;
  Freight:number;
 
}

export interface APIResponse {
  exito: boolean;
  message?: string;
  data?: any;
}