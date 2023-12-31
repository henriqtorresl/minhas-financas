import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaService } from '../../service/categoria.service';
import { Router } from '@angular/router';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'descricao', 'editar', 'excluir'];   // declarando quais colunas eu vou ter na tabela
  categorias: Categoria[] = [];
  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource<Categoria>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.buscarCategorias();

  }

  buscarCategorias(): void {
    this.categoriaService.getCategorias().subscribe((categorias: Categoria[]) => {
      console.log(categorias);
      this.categorias = categorias;

      // após fazer as requisições:
      this.dataSource.data = this.categorias;     // adicionando ao dataSource as categorias
      // inicializando o paginator:
      this.dataSource.paginator = this.paginator;
    });
  }

  chamarEdicao(categoria: Categoria): void {
    this.router.navigate(['categorias', 'editar', categoria.id]);
  }

  excluir(id: number) {
    this.categoriaService.excluirCategoria(id).subscribe(() => {
      // após excluir, atualiza a lista de categorias:
      this.buscarCategorias();
    });
  }

  novaCategoria(): void {
    this.router.navigate(['categorias', 'nova-categoria']);
  }

}