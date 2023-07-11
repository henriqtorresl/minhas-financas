import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from 'src/app/shared/base/http-base.service';
import { Entrada } from '../models/entrada.model';

@Injectable({
  providedIn: 'root'
})
export class EntradasService extends HttpBaseService{

  private endpoint: string = 'entradas';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  getEntradas(): Observable<any> {
    return this.httpGet(this.endpoint);
  }

  getEntradasPeloId(idEntrada: number): Observable<any> {
    return this.httpGet(`${this.endpoint}/${idEntrada}`);
  }

  alterarEntrada(entrada: Entrada): Observable<any> {
    return this.httpPut(`${this.endpoint}/${entrada.id}`, entrada);
  }

  excluirEntrada(idEntrada: number): Observable<any> {
    return this.httpDelete(`${this.endpoint}/${idEntrada}`);
  }

  criarEntrada(entrada: Entrada): Observable<any> {
    return this.httpPost(`${this.endpoint}`, entrada);
  }

}