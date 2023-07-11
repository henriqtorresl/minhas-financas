import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/features/categorias/models/categoria.model';
import { CategoriaService } from 'src/app/features/categorias/service/categoria.service';
import { EntradasService } from '../../service/entradas.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  tiposDeEntradas = [
    'Receita',
    'Despesa'
  ]

  statusDePagamento = [
    {value: true, descricao: 'Pago'},
    {value: false, descricao: 'Pendente'}
  ]

  categorias: Categoria[] = [];
  formEntradas!: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private entradaService: EntradasService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buscarCategorias();
    this.criarFormulario();
  }

  buscarCategorias():void {
    this.categoriaService.getCategorias()
    .subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
      console.log('requisição: ', this.categorias);
    });
  }

  criarFormulario(): void {
    this.formEntradas = this.formBuilder.group({
      nome: ['', Validators.required],
      valor: ['', Validators.required],
      categoriaId: ['', Validators.required],
      pago: [true, Validators.required],          // valor padrão
      tipo: ['Despesa', Validators.required],     // valor padrão
      data: [new Date(), Validators.required]     // valor padrão -> Data atual
    });
  }

  salvarEntrada(): void {

    const data = dayjs(this.formEntradas.controls['data'].value).format('DD/MM/YYYY');

    this.formEntradas.controls['data'].setValue(data);    // atualizando o campo data

    this.entradaService.criarEntrada(this.formEntradas.getRawValue())
    .subscribe(resposta => {
      console.log('Entrada criada!');
    });
  }

}