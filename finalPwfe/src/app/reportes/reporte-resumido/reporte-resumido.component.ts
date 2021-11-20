import { Component, OnInit } from '@angular/core';
import {Venta} from "../../model/Venta";

@Component({
  selector: 'app-reporte-resumido',
  templateUrl: './reporte-resumido.component.html',
  styleUrls: ['./reporte-resumido.component.css']
})
export class ReporteResumidoComponent implements OnInit {

  ventas: Venta[] = [];
  constructor() { }

  ngOnInit(): void {
    //localStorage.removeItem('detalles');
    const datos =  localStorage.getItem('ventas');
    if (datos !== null) {
      const ventas = JSON.parse(datos);
      this.ventas = ventas;
    }
  }

}
