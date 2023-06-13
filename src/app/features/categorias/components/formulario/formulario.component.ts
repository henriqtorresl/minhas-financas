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
  rota: string = '';
  isNovoFormulario: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.rota = this.activatedRoute.snapshot.url[0].path;

    this.criarFormulario();

    if (this.rota === 'editar') {
      this.id = this.activatedRoute.snapshot.url[1].path;   // através do activatedRoute eu consigo capturar o que está na rota
      this.buscarCategoriaPeloId();
    } else {
      this.isNovoFormulario = true;
    }

  }

  buscarCategoriaPeloId(): void {
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

  salvarCategoria(): void {
    // só vai salvar a categoria se os campos do fomulário tiverem sido alterados...
    if (this.formCategoria.touched && this.formCategoria.dirty) {
      
      // pegando o dado do formulário e armazena na variavel data
      const data: Categoria = {
        nome:  this.formCategoria.controls['nome'].value,
        descricao: this.formCategoria.controls['descricao'].value
      }

      if(this.isNovoFormulario) {     // se for um novo formulario eu crio, se não eu edito...
        this.criarCategoria(data);
      } else {
        data.id = this.categoria.id;
        this.editarCategoria(data);
      }

    }
  }

  editarCategoria(data: Categoria): void {

    this.categoriaService.alterarCategoria(data).subscribe((resposta) => {
      // retornar a tela anterior após a edição..
      this.router.navigate(['categorias']);

      console.log('O dado que foi editado é: ', data);
    });

  }

  criarCategoria(data: Categoria): void {

    this.categoriaService.criarCategoria(data).subscribe((resposta) => {
      // retornar a tela anterior após a criação..
      this.router.navigate(['categorias']);

      console.log('O dado que foi criado é: ', data);
    });
    
  }

}