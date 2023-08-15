import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() menu!: any[];
  
  estaLogado: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticationService.usuarioEstaLogado().subscribe((estaLogado) => {
      this.estaLogado = estaLogado;
    });
  }

  sair() {
    this.authenticationService.sair();
    this.router.navigate(['auth', 'login']);
  }

}