import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Cliente} from "../../model/Cliente";
import {Venta} from "../../model/Venta";

@Component({
  selector: 'app-registro-venta',
  templateUrl: './registro-venta.component.html',
  styleUrls: ['./registro-venta.component.css']
})
export class RegistroVentaComponent implements OnInit {

  venta: Venta = new Venta();
  ventaId: number = 0;
  fecha: string = "";
  dia: number = 0;
  mes: number = 0;
  ano: number = 0;
  clientes: Cliente[] = [];
  mensaje: String = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    const datos =  localStorage.getItem('clientes');
    if(datos != null){
      this.clientes = JSON.parse(datos);
    }
  }

  getNewVentaId() {
    const dato =  localStorage.getItem('ventaId');
    if (dato !== null) {
      this.ventaId = JSON.parse(dato);
      //Devuelvo +1 para el nuevo objeto
      return this.ventaId + 1;
    } else {
      //Guardo 1 si es nuevo
      return 1;
    }

  }

  getFecha(){
    const d = new Date();
    const curr_date = d.getDate();
    const curr_month = d.getMonth();
    const curr_year = d.getFullYear()
    const months = ["Ene", "Feb", "Mar",
      "Abr", "May", "Jun", "Jul", "Ago", "Sep",
      "Oct", "Nov", "Dic"];
    this.fecha = curr_date + "-" + months[curr_month] + "-" + curr_year;
    this.dia = curr_date;
    this.mes = curr_month+1;
    this.ano = curr_year;
  }

  confirmar(){
    if(this.venta.factura == undefined){
      this.mensaje = "--Introduzca Factura--";
    }else {
      if (this.venta.cliente == undefined) {
        this.mensaje = "--Seleccione un Cliente--";
      } else {
        debugger;
        //Llega id actualizado para guardar
        this.ventaId = this.getNewVentaId();
        this.getFecha();
        this.venta.ventaId = this.ventaId;
        this.venta.fecha = this.fecha;
        this.venta.dia = this.dia;
        this.venta.mes = this.mes;
        this.venta.ano = this.ano;

        const datos = localStorage.getItem('ventas');
        if (datos !== null) {
          const ventas = JSON.parse(datos);
          ventas.push(this.venta);
          localStorage.setItem('ventas', JSON.stringify(ventas));
          //Actualizar idProd
          localStorage.setItem('ventaId', JSON.stringify(this.ventaId));
        } else {
          const ventaArr = [];
          ventaArr.push(this.venta);
          localStorage.setItem('ventas', JSON.stringify(ventaArr));
          localStorage.setItem('ventaId', JSON.stringify(1));
        }
        this.router.navigate(['/detalle'], {queryParams: {id: this.venta.ventaId}});
      }
    }
  }

  cancelar(){
    this.router.navigateByUrl('/reporteResumido');
  }


}
