import { Component, OnInit } from '@angular/core';
import {Producto} from "../../model/Producto";
import {Router} from "@angular/router";
import {Cliente} from "../../model/Cliente";

@Component({
  selector: 'app-agregar-clientes',
  templateUrl: './agregar-clientes.component.html',
  styleUrls: ['./agregar-clientes.component.css']
})
export class AgregarClientesComponent implements OnInit {


  cliente: Cliente = new Cliente();
  clienteId: number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  getNewClienteId() {
    debugger;
    const dato =  localStorage.getItem('clienteId');
    if (dato !== null) {
      this.clienteId = JSON.parse(dato);
      //Devuelvo +1 para el nuevo objeto
      return this.clienteId + 1;
    } else {
      //Guardo 1 si es nuevo

      return 1;
    }
  }
  saveCliente() {
    debugger;
    //Llega id actualizado para guardar
    this.clienteId =  this.getNewClienteId();
    this.cliente.clienteId = this.clienteId;

    const datos =  localStorage.getItem('clientes');
    if (datos !== null) {
      const clientes = JSON.parse(datos);
      clientes.push(this.cliente);
      localStorage.setItem('clientes', JSON.stringify(clientes));
      //Actualizar idProd
      localStorage.setItem('clienteId', JSON.stringify(this.clienteId));
    } else {
      const clienteArr = [];
      clienteArr.push(this.cliente);
      localStorage.setItem('clientes', JSON.stringify(clienteArr));
      localStorage.setItem('clienteId', JSON.stringify(1));
    }
    this.router.navigateByUrl('/clientes');

  }


}
