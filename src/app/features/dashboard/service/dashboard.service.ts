import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from 'src/app/shared/base/http-base.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends HttpBaseService {

  private endpoint: string = 'entradas';

  constructor(protected override readonly injector: Injector) { 
    super(injector);    // chama o construtor da classe pai, e na classe pai o construtor recebe um injector
  }

  getEntradas(payload?: any): Observable<any> {

    const params = payload ? `?q=${payload.mes}/${payload.ano}` : '';

    return this.httpGet(`${this.endpoint}${params}`);     // chamando o método da classe pai..
    // dessa forma eu tenho uma função generica: se eu nn passar nenhum parametro nn acontece nd e se eu passar ela filtra pelos parametros...
  }

}