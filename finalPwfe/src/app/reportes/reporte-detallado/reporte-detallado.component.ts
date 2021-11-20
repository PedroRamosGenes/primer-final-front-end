import { Component, OnInit } from '@angular/core';
import {Venta} from "../../model/Venta";
import {Detalle} from "../../model/Detalle";

@Component({
  selector: 'app-reporte-detallado',
  templateUrl: './reporte-detallado.component.html',
  styleUrls: ['./reporte-detallado.component.css']
})
export class ReporteDetalladoComponent implements OnInit {

  detalles: Detalle[] = [];
  constructor() { }

  ngOnInit(): void {
    //localStorage.removeItem('detalles');
    const datos =  localStorage.getItem('detalles');
    if (datos !== null) {
      const detalles = JSON.parse(datos);
      this.detalles = detalles;
    }
  }

}
