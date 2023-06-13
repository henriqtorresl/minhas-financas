import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'      // qualquer módulo pode injetar esse service..
})
export class HttpBaseService {

  private readonly httpClient!: HttpClient;

  private apiBase: string = 'http://localhost:3000/';

  constructor( protected readonly injector: Injector ) {
    if(injector == null || injector == undefined) {
      throw new Error('Injector não pode ser nulo!');
    }

    this.httpClient = injector.get(HttpClient);     // dessa forma, temos uma injeção de dependências invertida

  }

  protected httpGet(endpoint: string): Observable<any> {    // protected: só pode ser visualizado por quem herdar da classe HttpBaseService
    return this.httpClient.get(`${this.apiBase}${endpoint}`);
  }

  protected httpPost(endpoint: string, dado: any): Observable<any> {
    return this.httpClient.post(`${this.apiBase}${endpoint}`, dado);
  }

  protected httpPut(endpoint: string, dado: any): Observable<any> {
    return this.httpClient.put(`${this.apiBase}${endpoint}`, dado);
  }

  protected httpDelete(endpoint: string): Observable<any> {
    return this.httpClient.delete(`${this.apiBase}${endpoint}`);
  }

  // Tratamento de erro e lançamento de exceções

}