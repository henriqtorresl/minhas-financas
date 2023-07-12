import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntradasRoutingModule } from './entradas-routing.module';
import { ListComponent } from './components/list/list.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusPipe } from './pipes/status.pipe';
import { RealPipe } from './pipes/real.pipe';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [
    ListComponent,
    FormularioComponent,
    StatusPipe,
    RealPipe
  ],
  imports: [
    CommonModule,
    EntradasRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  exports: [
    RealPipe
  ],
  providers: [    // providers: Recursos que adicionando ao nosso módulo onde todos os componentes que foram declarados nesse módulo podem fazer o uso desse provider...
    provideNgxMask()
  ]
})
export class EntradasModule { }
