import { Component, OnInit } from '@angular/core';
import {Cliente} from "../../model/Cliente";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor() { }

  ngOnInit(): void {
    debugger;
    const datos = localStorage.getItem('clientes');
    if (datos !==  null) {
      this.clientes = JSON.parse(datos);
    }
  }

  delete(id:any) {
    debugger;
    const datos =  localStorage.getItem('clientes');
    if (datos !== null) {
      const clientes = JSON.parse(datos);
      clientes.splice(clientes.findIndex((a:any)=>a.clienteId == id),1);
      localStorage.setItem('clientes', JSON.stringify(clientes));
    }
    const datosNew = localStorage.getItem('clientes');
    if (datosNew !==  null) {
      this.clientes = JSON.parse(datosNew);
    }
  }

}
