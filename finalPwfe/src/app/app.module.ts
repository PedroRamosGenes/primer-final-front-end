import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos/productos.component';
import { AgregarProductosComponent } from './productos/agregar-productos/agregar-productos.component';
import { EditarProductosComponent } from './productos/editar-productos/editar-productos.component';
import {FormsModule} from "@angular/forms";
import { ClientesComponent } from './clientes/clientes/clientes.component';
import { AgregarClientesComponent } from './clientes/agregar-clientes/agregar-clientes.component';
import { EditarClientesComponent } from './clientes/editar-clientes/editar-clientes.component';
import { RegistroVentaComponent } from './registroVenta/registro-venta/registro-venta.component';
import { DetalleComponent } from './registroVenta/detalle/detalle.component';
import { ReporteResumidoComponent } from './reportes/reporte-resumido/reporte-resumido.component';
import { ReporteDetalladoComponent } from './reportes/reporte-detallado/reporte-detallado.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    AgregarProductosComponent,
    EditarProductosComponent,
    ClientesComponent,
    AgregarClientesComponent,
    EditarClientesComponent,
    RegistroVentaComponent,
    DetalleComponent,
    ReporteResumidoComponent,
    ReporteDetalladoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
