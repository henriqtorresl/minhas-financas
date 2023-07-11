import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Entrada } from '../../models/entrada.model';
import { EntradasService } from '../../service/entradas.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'nome',
    'pago',
    'data',
    'valor',
    'tipo',
    'editar',
    'excluir'
  ];
  dataSource!: MatTableDataSource<Entrada>;
  entradas: Entrada[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private entradaService: EntradasService,
    private router: Router
  ) 
  { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  chamarEdicao(entrada: Entrada): void {
    this.router.navigate(['entrada', 'editar', entrada.id]);
  }

  excluir(id: number): void {

  }

  novaEntrada(): void {
    this.router.navigate(['entrada', 'nova-entrada']);
  }

}