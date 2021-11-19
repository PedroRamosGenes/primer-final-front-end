import { Component, OnInit } from '@angular/core';
import {Producto} from "../../model/Producto";

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor() { }

  ngOnInit(): void {
    debugger;
    const datos = localStorage.getItem('productos');
    if (datos !==  null) {
      this.productos = JSON.parse(datos);
    }
  }

  delete(id:any) {
    debugger;
    const datos =  localStorage.getItem('productos');
    if (datos !== null) {
      const productos = JSON.parse(datos);
      productos.splice(productos.findIndex((a:any)=>a.productoId == id),1);
      localStorage.setItem('productos', JSON.stringify(productos));
    }
    const datosNew = localStorage.getItem('productos');
    if (datosNew !==  null) {
      this.productos = JSON.parse(datosNew);
    }
  }

}
