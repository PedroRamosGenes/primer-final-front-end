import { Component, OnInit } from '@angular/core';
import {Producto} from "../../model/Producto";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent implements OnInit {

  producto: Producto = new Producto();
  productos: Producto[] = [];
  mensaje: String = "";
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((res)=> {
      this.producto.productoId = res['id']
    });
  }

  ngOnInit(): void {
    const datos =  localStorage.getItem('productos');
    if (datos !== null) {
      const productos = JSON.parse(datos);
      const producto = productos.find((m: any) => m.productoId == this.producto.productoId);
      if (producto !== undefined) {
        this.producto.codigo = producto.codigo;
        this.producto.nombre = producto.nombre;
        this.producto.precioVenta = producto.precioVenta;
        this.producto.existencia = producto.existencia;
      }
    }
  }


  updateProducto() {
    if(this.producto.codigo == ""){
      this.mensaje = "--Introduzca un Codigo--";
    }else {
      if (this.producto.nombre == "") {
        this.mensaje = "--Introduzca un Nombre--";
      } else {
        if (this.producto.precioVenta == undefined) {
          this.mensaje = "--Introduzca un Precio--";
        } else {
          if (this.producto.existencia == "") {
            this.mensaje = "--Seleccione Existencia--";
          } else {
            debugger;
            const datos = localStorage.getItem('productos');
            if (datos !== null) {
              this.productos = JSON.parse(datos);
              for (let i = 0; i < this.productos.length; i++) {
                if (this.productos[i].productoId == this.producto.productoId) {
                  this.productos[i] = this.producto;
                }
              }
              localStorage.setItem('productos', JSON.stringify(this.productos));
            }
            this.router.navigateByUrl('/productos');
          }
        }
      }
    }


  }

  cancelar(){
    this.router.navigateByUrl('/productos');
  }

}
