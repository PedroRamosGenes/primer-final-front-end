import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Producto} from "../../model/Producto";
import {Detalle} from "../../model/Detalle";
import {Venta} from "../../model/Venta";
import {Cliente} from "../../model/Cliente";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  venta: Venta;
  ventas: Venta[] = [];
  cliente: Cliente;
  detalle: Detalle;
  detalles: Detalle[] = [];
  detallesAux: Detalle[] = [];
  detalleId: number = 0;
  producto: Producto = new Producto();
  productos: Producto[] = [];
  ventaId: number = 0;
  det: Detalle[] = [];
  productoMostrar: Producto = new Producto();

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {this.ventaId = params['id'];});
    debugger;
    this.detalle = new Detalle();
    this.cliente  = new Cliente();
    this.venta = new Venta();
    this.venta.cliente = this.cliente;
  }

  ngOnInit(): void {
    const datos =  localStorage.getItem('ventas');
    if (datos !== null) {
      const ventas = JSON.parse(datos);
      const venta = ventas.find((m: any) => m.ventaId == this.ventaId);
      if (venta !== undefined) {
        this.venta.ventaId = this.ventaId;
        this.venta.fecha = venta.fecha;
        this.venta.dia = venta.dia;
        this.venta.mes = venta.mes;
        this.venta.ano = venta.ano;
        this.venta.factura = venta.factura;
        this.venta.cliente = venta.cliente;
        this.venta.total = 0;
        this.cliente = venta.cliente;
        debugger;
      }
    }

    this.producto.precioVenta = 0;
    //this.detalle.producto = this.producto;
    this.detalle.cantidad = 0;

    const datos2 =  localStorage.getItem('productos');
    if(datos2 != null){
      this.productos = JSON.parse(datos2);
    }

    const datos3 =  localStorage.getItem('detalles');
    if(datos3 != null){
      this.detallesAux = JSON.parse(datos3);
      for(let i=0; i<this.detallesAux.length; i++){
        if( this.detallesAux[i].ventaId == this.ventaId){
          this.detalles.push(this.detallesAux[i]);
        }
      }
    }
  }

  getNewDetalleId() {
    debugger;
    const dato =  localStorage.getItem('detalleId');
    if (dato !== null) {
      this.detalleId = JSON.parse(dato);
      //Devuelvo +1 para el nuevo objeto
      return this.detalleId + 1;
    } else {
      //Guardo 1 si es nuevo
      return 1;
    }

  }

  agregarDetalle(){
    debugger;
    //Llega id actualizado para guardar
    this.detalleId =  this.getNewDetalleId();
    this.detalle.detalleId = this.detalleId;
    this.detalle.ventaId = this.ventaId;
    this.detalle.fecha = this.venta.fecha;
    this.detalle.dia = this.venta.dia;
    this.detalle.mes = this.venta.mes;
    this.detalle.ano = this.venta.ano;
    this.detalle.cliente = this.venta.cliente;
    // @ts-ignore
    this.detalle.totalDetalle = this.detalle.producto.precioVenta * this.detalle.cantidad;

    const datos =  localStorage.getItem('detallesAux');
    if (datos !== null) {
      const detalles = JSON.parse(datos);
      detalles.push(this.detalle);
      localStorage.setItem('detallesAux', JSON.stringify(detalles));
      //Actualizar idProd
      localStorage.setItem('detalleId', JSON.stringify(this.detalleId));
    } else {
      const detalleArr = [];
      detalleArr.push(this.detalle);
      localStorage.setItem('detallesAux', JSON.stringify(detalleArr));
      localStorage.setItem('detalleId', JSON.stringify(this.detalleId));
    }
    //Actualiza
    const datos2 =  localStorage.getItem('detallesAux');
    if (datos2 !== null) {
      this.detalles = JSON.parse(datos2);
    }
    // @ts-ignore
    this.venta.total = this.venta.total + this.detalle.totalDetalle;

    const datos3 =  localStorage.getItem('ventas');
    if (datos3 !== null) {
      this.ventas = JSON.parse(datos3);
      for(let i=0; i<this.ventas.length; i++){
        if( this.ventas[i].ventaId == this.venta.ventaId){
          this.ventas[i] = this.venta;
        }
      }
      localStorage.setItem('ventas', JSON.stringify(this.ventas));
    }

  }

  deleteDetalle(id:any){

    const datos =  localStorage.getItem('detallesAux');
    if (datos !== null) {
      const detallesAux = JSON.parse(datos);
      detallesAux.splice(detallesAux.findIndex((a:any)=>a.detalleId == id),1);
      localStorage.setItem('detallesAux', JSON.stringify(detallesAux));
    }
    const datosNew = localStorage.getItem('detallesAux');
    if (datosNew !==  null) {
      this.detalles = JSON.parse(datosNew);
    }
  }

  confirmar(){
    const detallesAux =  localStorage.getItem('detallesAux');
    if (detallesAux !== null) {
      this.detallesAux = JSON.parse(detallesAux);
      const datos =  localStorage.getItem('detalles');
      if (datos !== null) {
        const detalles = JSON.parse(datos);
        for(let i=0; i<this.detallesAux.length; i++){
          detalles.push(this.detallesAux[i]);
        }
        localStorage.setItem('detalles', JSON.stringify(detalles));
      } else {
        const detalleArr = [];
        for(let i=0; i<this.detallesAux.length; i++){
          detalleArr.push(this.detallesAux[i]);
        }
        localStorage.setItem('detalles', JSON.stringify(detalleArr));
      }

    }
    //Cerar Aux
    localStorage.setItem('detallesAux', JSON.stringify(this.det));
    this.router.navigateByUrl('/productos');
  }

  cancelar(){
    const datos =  localStorage.getItem('ventas');
    if (datos !== null) {
      const ventas = JSON.parse(datos);
      ventas.splice(ventas.findIndex((a:any)=>a.ventaId == this.ventaId),1);
      localStorage.setItem('ventas', JSON.stringify(ventas));
    }

    const dato2 =  localStorage.getItem('ventaId');
    if (dato2 !== null) {
      this.ventaId = JSON.parse(dato2);
      localStorage.setItem('ventaId', JSON.stringify(this.ventaId - 1));
    }
    this.router.navigateByUrl('/productos');
  }


}
