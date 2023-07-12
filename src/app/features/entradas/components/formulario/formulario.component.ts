import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/features/categorias/models/categoria.model';
import { CategoriaService } from 'src/app/features/categorias/service/categoria.service';
import { EntradasService } from '../../service/entradas.service';
import * as dayjs from 'dayjs';
import { Entrada } from '../../models/entrada.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  tiposDeEntradas = [
    'receita',
    'despesa'
  ]

  statusDePagamento = [
    {value: true, descricao: 'Pago'},
    {value: false, descricao: 'Pendente'}
  ]

  categorias: Categoria[] = [];
  formEntradas!: FormGroup;
  rota: string = '';
  id: string = '';
  entrada!: Entrada;
  estaCriando: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
    private entradaService: EntradasService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarCategorias();
    this.criarFormulario();

    this.rota = this.route.snapshot.url[0].path;        // pega o primeiro parâmetro da url
    if (this.rota === 'editar') {
      this.id = this.route.snapshot.url[1].path;        // pega o segundo parâmetro da url..

      this.buscarEntradaPeloId();
    } else {
      this.estaCriando = true;
    }

  }

  buscarEntradaPeloId(): void {
    this.entradaService.getEntradasPeloId(+this.id)           // o '+' é como se fosse o ParseInt, é uma outra forma de formatar string para number
    .subscribe((entrada: Entrada) => {
      this.entrada = entrada;
      console.log(this.entrada);

      const data = this.entrada.data.split('/');

      // trazendo os campos da requisição para preencher o formuláruio na tela de edição
      this.formEntradas.controls['nome'].setValue(this.entrada.nome);
      this.formEntradas.controls['valor'].setValue(this.entrada.valor);
      this.formEntradas.controls['categoriaId'].setValue(this.entrada.categoriaId);
      this.formEntradas.controls['pago'].setValue(this.entrada.pago);
      this.formEntradas.controls['tipo'].setValue(this.entrada.tipo);
      this.formEntradas.controls['data'].setValue(new Date(+data[2], +data[1] - 1, +data[0])); 
    });
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

    const payloadRequest: Entrada = Object.assign('', this.formEntradas.getRawValue());

    payloadRequest.data = data;

    const payload: Entrada = {
      nome: payloadRequest.nome,
      categoriaId: payloadRequest.categoriaId,
      data: payloadRequest.data,
      pago: payloadRequest.pago,
      tipo: payloadRequest.tipo,
      valor: payloadRequest.valor
    }

    if (this.estaCriando == true) {
      this.criarNovaEntrada(payload);
    } else {
      payload.id = this.entrada.id;
      this.editarEntrada(payload);
    }
  }

  criarNovaEntrada(payload: Entrada) {
    this.entradaService.criarEntrada(payload)
    .subscribe(resposta => {
      this.router.navigate(['entradas']);
      console.log('Criado');
    })
  }

  editarEntrada(payload: Entrada) {
    this.entradaService.alterarEntrada(payload)
    .subscribe(resposta => {
      this.router.navigate(['entradas']);
      console.log('Editado');
    })
  }

  redirecionar(): void {
    this.router.navigate(['entradas']);
  }

}