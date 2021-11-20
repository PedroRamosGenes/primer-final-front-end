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
  productoId: number = 0;
  mensaje: String = "";

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  getNewProductId() {
    debugger;
    const dato =  localStorage.getItem('productoId');
    if (dato !== null) {
      this.productoId = JSON.parse(dato);
      //Devuelvo +1 para el nuevo objeto
      return this.productoId + 1;
    } else {
      //Guardo 1 si es nuevo

      return 1;
    }
  }
  saveProducto() {
    if(this.producto.codigo == undefined){
      this.mensaje = "--Introduzca un Codigo--";
    }else{
      if(this.producto.nombre == undefined){
        this.mensaje = "--Introduzca un Nombre--";
      }else{
        if(this.producto.precioVenta == undefined){
          this.mensaje = "--Introduzca un Precio--";
        }else{
          if(this.producto.existencia == undefined){
            this.mensaje = "--Seleccione Existencia--";
          }else{
            //Llega id actualizado para guardar
            this.productoId =  this.getNewProductId();
            this.producto.productoId = this.productoId;

            const datos =  localStorage.getItem('productos');
            if (datos !== null) {
              const productos = JSON.parse(datos);
              productos.push(this.producto);
              localStorage.setItem('productos', JSON.stringify(productos));
              //Actualizar idProd
              localStorage.setItem('productoId', JSON.stringify(this.productoId));
            } else {
              const productoArr = [];
              productoArr.push(this.producto);
              localStorage.setItem('productos', JSON.stringify(productoArr));
              localStorage.setItem('productoId', JSON.stringify(1));
            }
            this.router.navigateByUrl('/productos');
          }
        }
      }
    }
    debugger;
  }

  cancelar(){
    this.router.navigateByUrl('/productos');
  }

}
