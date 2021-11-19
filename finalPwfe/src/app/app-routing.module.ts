import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductosComponent} from "./productos/productos/productos.component";
import {AgregarProductosComponent} from "./productos/agregar-productos/agregar-productos.component";
import {EditarProductosComponent} from "./productos/editar-productos/editar-productos.component";


const routes: Routes = [{
  path:'productos',
  component:ProductosComponent
},
  {
    path:'agregarProductos',
    component:AgregarProductosComponent
  },
  {
    path:'editarProductos/:id',
    component:EditarProductosComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
