import {Cliente} from "./Cliente";

export class Venta {
  ventaId?: number;
  fecha?: string;
  factura?: number;
  dia?: number;
  mes?: number;
  ano?: number;
  cliente?: Cliente;
  total?: number;
}
