import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductosComponent} from "./productos/productos/productos.component";
import {AgregarProductosComponent} from "./productos/agregar-productos/agregar-productos.component";
import {EditarProductosComponent} from "./productos/editar-productos/editar-productos.component";
import {AgregarClientesComponent} from "./clientes/agregar-clientes/agregar-clientes.component";
import {EditarClientesComponent} from "./clientes/editar-clientes/editar-clientes.component";
import {ClientesComponent} from "./clientes/clientes/clientes.component";
import {RegistroVentaComponent} from "./registroVenta/registro-venta/registro-venta.component";
import {DetalleComponent} from "./registroVenta/detalle/detalle.component";


const routes: Routes = [{
  path:'productos',
  component:ProductosComponent
},
  {
    path:'clientes',
    component:ClientesComponent
  },
  {
    path:'registroVentas',
    component:RegistroVentaComponent
  },
  {
    path:'detalle',
    component:DetalleComponent
  },
  {
    path:'agregarProductos',
    component:AgregarProductosComponent
  },
  {
    path:'editarProductos/:id',
    component:EditarProductosComponent
  },
  {
    path:'agregarClientes',
    component:AgregarClientesComponent
  },
  {
    path:'editarClientes/:id',
    component:EditarClientesComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
