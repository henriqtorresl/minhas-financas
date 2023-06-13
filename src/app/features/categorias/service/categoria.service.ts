import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from 'src/app/shared/base/http-base.service';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends HttpBaseService{

  private endpoint: string = 'categorias';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  getCategorias(): Observable<any> {
    return this.httpGet(this.endpoint);
  }

  getCategoriasPeloId(idCategoria: number): Observable<any> {
    return this.httpGet(`${this.endpoint}/${idCategoria}`);
  }

  alterarCategoria(categoria: Categoria): Observable<any> {
    return this.httpPut(`${this.endpoint}/${categoria.id}`, categoria);
  }

  excluirCategoria(idCategoria: number): Observable<any> {
    return this.httpDelete(`${this.endpoint}/${idCategoria}`);
  }

  criarCategoria(categoria: Categoria): Observable<any> {
    return this.httpPost(`${this.endpoint}`, categoria);
  }

}