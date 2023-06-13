import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaService } from '../../service/categoria.service';

export interface Categoria {
  nome: string;
  descricao: string;
  id: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'descricao'];   // declarando quais colunas eu vou ter na tabela
  dataSource = new MatTableDataSource<Categoria>();
  categorias: Categoria[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    
    this.categoriaService.getCategorias().subscribe((categorias: Categoria[]) => {
      console.log(categorias);
      this.categorias = categorias;

      // após fazer as requisições:
      this.dataSource.data = this.categorias;     // adicionando ao dataSource as categorias
      // inicializando o paginator:
      this.dataSource.paginator = this.paginator;
    });

  }
}