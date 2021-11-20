import {Cliente} from "./Cliente";
import {Producto} from "./Producto";

export class Detalle {
  detalleId?: number;
  ventaId?: number;
  fecha?: string;
  dia!: number;
  mes!: number;
  ano!: number;
  cliente!: Cliente;
  producto!: Producto;
  cantidad?: number;
  totalDetalle?: number;
}
