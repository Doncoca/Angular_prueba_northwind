export interface Order {
  OrderID: number;
  ShipName: string;
  ShipVia: number;
  Freigth:number;
 
}

export interface APIResponse {
  exito: boolean;
  message?: string;
  data?: any;
}