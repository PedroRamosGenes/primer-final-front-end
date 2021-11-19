import { Component, OnInit } from '@angular/core';
import {Producto} from "../../model/Producto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-agregar-productos',
  templateUrl: './agregar-productos.component.html',
  styleUrls: ['./agregar-productos.component.css']
})
export class AgregarProductosComponent implements OnInit {

  producto: Producto = new Producto();
  pruductoId: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  getNewProductId() {
    debugger;
    const dato =  localStorage.getItem('productoId');
    if (dato !== null) {
      this.pruductoId = JSON.parse(dato);
      //Devuelvo +1 para el nuevo objeto
      return this.pruductoId + 1;
    } else {
      //Guardo 1 si es nuevo

      return 1;
    }
  }
  saveProducto() {
    debugger;
    //Llega id actualizado para guardar
    this.pruductoId =  this.getNewProductId();
    this.producto.productoId = this.pruductoId;

    const datos =  localStorage.getItem('productos');
    if (datos !== null) {
      const productos = JSON.parse(datos);
      productos.push(this.producto);
      localStorage.setItem('productos', JSON.stringify(productos));
      //Actualizar idProd
      localStorage.setItem('productoId', JSON.stringify(this.pruductoId));
    } else {
      const productoArr = [];
      productoArr.push(this.producto);
      localStorage.setItem('productos', JSON.stringify(productoArr));
      localStorage.setItem('productoId', JSON.stringify(1));
    }
    this.router.navigateByUrl('/productos');

  }

}
