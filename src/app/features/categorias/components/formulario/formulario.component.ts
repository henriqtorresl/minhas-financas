import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../service/categoria.service';
import { Categoria } from '../../models/categoria.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  categoria!: Categoria;
  id: string = '';
  formCategoria!: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.url[1].path;   // através do activatedRoute eu consigo capturar o que está na rota

    this.criarFormulario();

    this.categoriaService.getCategoriasPeloId(parseInt(this.id)).subscribe((categoria: Categoria) => {
      this.categoria = categoria;
      console.log(this.categoria);

      // apos a requisição e o meu formulário já ter sido criado:
      this.formCategoria.controls['nome'].setValue(categoria.nome);
      this.formCategoria.controls['descricao'].setValue(categoria.descricao);
    });

  }

  criarFormulario(): void {
    this.formCategoria = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        descricao: ['', Validators.required]
      }
    );
  }

}