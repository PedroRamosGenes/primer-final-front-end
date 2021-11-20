import { Component, OnInit } from '@angular/core';
import {Cliente} from "../../model/Cliente";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.css']
})
export class EditarClientesComponent implements OnInit {


  cliente: Cliente = new Cliente();
  clientes: Cliente[] = [];
  mensaje: String = "";
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((res)=> {
      this.cliente.clienteId = res['id']
    });
  }

  ngOnInit(): void {
    const datos =  localStorage.getItem('clientes');
    if (datos !== null) {
      const clientes = JSON.parse(datos);
      const cliente = clientes.find((m: any) => m.clienteId == this.cliente.clienteId);
      if (cliente !== undefined) {
        this.cliente.ruc = cliente.ruc;
        this.cliente.nombreApellido = cliente.nombreApellido;
        this.cliente.email = cliente.email;
      }
    }
  }


  updateCliente() {
    if(this.cliente.ruc == ""){
      this.mensaje = "--Introduzca un Ruc--";
    }else {
      if (this.cliente.nombreApellido == "") {
        this.mensaje = "--Introduzca Nombre Completo--";
      } else {
        if (this.cliente.email == "") {
          this.mensaje = "--Introduzca un Email--";
        } else {
          debugger;
          const datos = localStorage.getItem('clientes');
          if (datos !== null) {
            this.clientes = JSON.parse(datos);
            for (let i = 0; i < this.clientes.length; i++) {
              if (this.clientes[i].clienteId == this.cliente.clienteId) {
                this.clientes[i] = this.cliente;
              }
            }
            localStorage.setItem('clientes', JSON.stringify(this.clientes));
          }
          this.router.navigateByUrl('/clientes');
        }
      }
    }
  }

  cancelar(){
    this.router.navigateByUrl('/clientes');
  }

}
