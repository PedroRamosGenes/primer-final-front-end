import { Component, OnInit } from '@angular/core';
import {Venta} from "../../model/Venta";
import {Cliente} from "../../model/Cliente";

@Component({
  selector: 'app-reporte-resumido',
  templateUrl: './reporte-resumido.component.html',
  styleUrls: ['./reporte-resumido.component.css']
})
export class ReporteResumidoComponent implements OnInit {

  clienteSelec: Cliente = new Cliente();
  clientes: Cliente[] = [];
  fechadesde: any;
  fechahasta: any;
  ventas: Venta[] = [];
  ventasAux: Venta[] = [];
  dia: number = 0;
  mes: number = 0;
  ano: number = 0;
  clienteOk: boolean = false;
  fechaDesdeOK: boolean = false;
  clickBuscar: boolean = false;
  mensaje: string = "";
  constructor() { }

  ngOnInit(): void {
    //localStorage.removeItem('ventas');
    //localStorage.removeItem('ventaId');
    //localStorage.removeItem('detalles');
    //localStorage.removeItem('detalleId');
    //localStorage.removeItem('detallesAux');
    const datos =  localStorage.getItem('ventas');
    if (datos !== null) {
      const ventas = JSON.parse(datos);
      this.ventas = ventas;
      this.ventasAux = ventas;
    }

    //Cargar clientes
    const datos2 =  localStorage.getItem('clientes');
    if (datos2 !== null) {
      const clientes = JSON.parse(datos2);
      this.clientes = clientes;
    }
  }

  buscar(){
    this.clickBuscar = true;
    debugger;
    if(this.clienteSelec.clienteId != undefined){
      debugger;
      const aux = [];
      this.clienteOk = true;
      for(let i=0; i<this.ventas.length; i++){
        debugger;
        if(this.ventas[i].cliente.clienteId == this.clienteSelec.clienteId){
          aux.push(this.ventas[i]);
        }
      }
      this.ventasAux = aux;
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
        for (let i = 0; i < this.ventasAux.length; i++) {
          if (this.ventasAux[i].ano >= this.ano && this.ventasAux[i].mes >= this.mes
            && this.ventasAux[i].dia >= this.dia) {
            aux2.push(this.ventasAux[i]);
          }
        }
      }else{
        for (let i = 0; i < this.ventas.length; i++) {
          if (this.ventas[i].ano >= this.ano && this.ventas[i].mes >= this.mes
            && this.ventas[i].dia >= this.dia) {
            aux2.push(this.ventas[i]);
          }
        }
      }
      this.ventasAux = aux2;
    }

    debugger;
    if(this.fechahasta != undefined){
      this.ano = parseInt(this.fechahasta.toString().substr(0, 4));
      this.mes = parseInt(this.fechahasta.toString().substr(5, 2));
      this.dia = parseInt(this.fechahasta.toString().substr(8, 2));
      debugger;
      const aux2 = [];
      if(this.clienteOk || this.fechaDesdeOK){
        for (let i = 0; i < this.ventasAux.length; i++) {
          if (this.ventasAux[i].ano <= this.ano && this.ventasAux[i].mes <= this.mes
            && this.ventasAux[i].dia <= this.dia) {
            const flag = this.ventasAux[i].mes <= this.mes;
            aux2.push(this.ventasAux[i]);
          }
        }
      }else{
        for (let i = 0; i < this.ventas.length; i++) {
          if (this.ventas[i].ano <= this.ano && this.ventas[i].mes <= this.mes
            && this.ventas[i].dia <= this.dia) {
            const flag = this.ventasAux[i].mes <= this.mes;
            aux2.push(this.ventas[i]);
          }
        }
      }
      this.ventasAux = aux2;
    }

    debugger;

    if(this.clienteSelec.clienteId == undefined && this.fechadesde == undefined && this.fechahasta == undefined){
      this.mensaje="Seleccione valores de filtro.";
    }


    this.clienteOk = false;
    this.fechaDesdeOK = false;
  }


  limpiar(){
    this.clickBuscar = false;
    this.ventasAux = this.ventas;
  }

}
