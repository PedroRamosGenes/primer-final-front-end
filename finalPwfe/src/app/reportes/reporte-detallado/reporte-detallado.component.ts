import { Component, OnInit } from '@angular/core';
import {Venta} from "../../model/Venta";
import {Detalle} from "../../model/Detalle";
import {Cliente} from "../../model/Cliente";
import {Producto} from "../../model/Producto";

@Component({
  selector: 'app-reporte-detallado',
  templateUrl: './reporte-detallado.component.html',
  styleUrls: ['./reporte-detallado.component.css']
})
export class ReporteDetalladoComponent implements OnInit {

  detalles: Detalle[] = [];
  productoSelec: Producto = new Producto();
  productos: Producto[] = [];
  fechadesde: any;
  fechahasta: any;
  detallesAux: Detalle[] = [];
  dia: number = 0;
  mes: number = 0;
  ano: number = 0;
  clienteOk: boolean = false;
  fechaDesdeOK: boolean = false;
  clickBuscar: boolean = false;
  mensaje: string = "";
  constructor() { }

  ngOnInit(): void {
    //localStorage.removeItem('detalles');
    const datos =  localStorage.getItem('detalles');
    if (datos !== null) {
      const detalles = JSON.parse(datos);
      this.detalles = detalles;
      this.detallesAux = detalles;
    }

    //Cargar productos
    const datos2 =  localStorage.getItem('productos');
    if (datos2 !== null) {
      const productos = JSON.parse(datos2);
      this.productos = productos;
    }
  }

  buscar(){
    this.clickBuscar = true;
    debugger;
    if(this.productoSelec.productoId != undefined){
      debugger;
      const aux = [];
      this.clienteOk = true;
      for(let i=0; i<this.detalles.length; i++){
        debugger;
        if(this.detalles[i].producto.productoId == this.productoSelec.productoId){
          aux.push(this.detalles[i]);
        }
      }
      this.detallesAux = aux;
    }

    debugger;

    if(this.fechadesde != undefined) {
      this.fechaDesdeOK = true;
      this.ano = parseInt(this.fechadesde.toString().substr(0, 4));
      this.mes = parseInt(this.fechadesde.toString().substr(5, 2));
      this.dia = parseInt(this.fechadesde.toString().substr(8, 2));
      debugger;
      const aux2 = [];
      if(this.clienteOk){
        for (let i = 0; i < this.detallesAux.length; i++) {
          if (this.detallesAux[i].ano >= this.ano && this.detallesAux[i].mes >= this.mes
            && this.detallesAux[i].dia >= this.dia) {
            aux2.push(this.detallesAux[i]);
          }
        }
      }else{
        for (let i = 0; i < this.detalles.length; i++) {
          if (this.detalles[i].ano >= this.ano && this.detalles[i].mes >= this.mes
            && this.detalles[i].dia >= this.dia) {
            aux2.push(this.detalles[i]);
          }
        }
      }
      this.detallesAux = aux2;
    }

    debugger;
    if(this.fechahasta != undefined){
      this.ano = parseInt(this.fechahasta.toString().substr(0, 4));
      this.mes = parseInt(this.fechahasta.toString().substr(5, 2));
      this.dia = parseInt(this.fechahasta.toString().substr(8, 2));
      debugger;
      const aux2 = [];
      if(this.clienteOk || this.fechaDesdeOK){
        for (let i = 0; i < this.detallesAux.length; i++) {
          if (this.detallesAux[i].ano <= this.ano && this.detallesAux[i].mes <= this.mes
            && this.detallesAux[i].dia <= this.dia) {
            aux2.push(this.detallesAux[i]);
          }
        }
      }else{
        for (let i = 0; i < this.detalles.length; i++) {
          if (this.detalles[i].ano <= this.ano && this.detalles[i].mes <= this.mes
            && this.detalles[i].dia <= this.dia) {
            aux2.push(this.detalles[i]);
          }
        }
      }
      this.detallesAux = aux2;
    }

    debugger;

    if(this.productoSelec.productoId == undefined && this.fechadesde == undefined && this.fechahasta == undefined){
      this.mensaje="Seleccione valores de filtro.";
    }


    this.clienteOk = false;
    this.fechaDesdeOK = false;
  }


  limpiar(){
    this.clickBuscar = false;
    this.detallesAux = this.detalles;
  }

}
