import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpBaseService } from 'src/app/shared/base/http-base.service';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends HttpBaseService {

  // subjects
  // bahaviorSubjects  -> após fazermos o login viremos aq para dentro do behaviorSubjects para pegar os dados do usuário..

  private subjectUsuario: BehaviorSubject<any> = new BehaviorSubject(null);
  private subjectLogin: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    protected override readonly injector: Injector
  ) {
    super(injector);
  }

  login(login: Login): Observable<any> {
    return this.httpPost('authentication', login).pipe(
      map((resposta) => {
        sessionStorage.setItem('token', resposta.token);
        this.subjectUsuario.next(resposta.user);
        this.subjectLogin.next(true);

        return resposta.user;
      })
    );
  }

  sair(): void {
    sessionStorage.removeItem('token');   // remover o token
    this.subjectUsuario.next(null);
    this.subjectLogin.next(false);
  }

  usuarioEstaLogado(): Observable<any> {
    const token = sessionStorage.getItem('token');

    if (token) {    // verifica se o token existe
      this.subjectLogin.next(true);
    }

    return this.subjectLogin.asObservable();
  }

  obterUsuario(): void {
    this.subjectUsuario.asObservable();
  }

}