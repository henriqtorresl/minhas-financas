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

  getEntradas(): Observable<any> {
    return this.httpGet(this.endpoint);     // chamando o método da classe pai..
  }

}