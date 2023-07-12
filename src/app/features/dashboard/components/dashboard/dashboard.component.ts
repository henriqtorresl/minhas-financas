import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { Entrada } from './models/entrada.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  meses = [
    { value: 0, viewValue: 'Janeiro' },
    { value: 1, viewValue: 'Fevereiro' },
    { value: 2, viewValue: 'Março' },
    { value: 3, viewValue: 'Abril' },
    { value: 4, viewValue: 'Maio' },
    { value: 5, viewValue: 'Junho' },
    { value: 6, viewValue: 'Julho' },
    { value: 7, viewValue: 'Agosto' },
    { value: 8, viewValue: 'Setembro' },
    { value: 9, viewValue: 'Outubro' },
    { value: 10, viewValue: 'Novembro' },
    { value: 11, viewValue: 'Dezembre' },
  ]

  entradas: any[] = [];
  saldo: number = 0;
  despesa: number = 0;
  receita: number = 0;

  formDashboard!: FormGroup;

  constructor(
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
  }

  getEntradas(): void {
    // reiniciando minhas variaveis:
    this.entradas = [];
    this.saldo = 0;
    this.despesa = 0;
    this.receita = 0;

    const payload = {
      mes: this.formDashboard.controls['mes'].value + 1,
      ano: this.formDashboard.controls['ano'].value
    }

    this.dashboardService.getEntradas(payload).subscribe((entradas) => {
      this.entradas = entradas;

      // Após a requisição das entradas ter sido feita, eu chamo os métodos que vão preencher o campo receita e despesa (por isso eu tenho que chamar dentro do subscribe, pois ele chama os métodos exatamente depois da requisição..):
      this.getReceitas();
      this.getDespesas();
      // Agora eu posso calcular o saldo:
      this.getSaldo();
    });
  }

  criarFormulario(): void {
    this.formDashboard = this.formBuilder.group({
      mes: ['', Validators.required],
      ano: ['', Validators.required]
    });
  }

  getReceitas(): void {   // preenche o campo receita
    this.entradas.forEach( (entrada: Entrada) => {
      if(entrada.tipo === 'receita') {    // se for do tipo receita, vou somar o valor
        this.receita += parseInt(entrada.valor);
      }
    });
  }

  getDespesas(): void {   // preenche o campo despesa
    this.entradas.forEach( (entrada: Entrada) => {
      if(entrada.tipo === 'despesa') {
        this.despesa += parseInt(entrada.valor);
      }
    });
  }

  getSaldo(): void {
    this.saldo = this.receita - this.despesa;
  }

}