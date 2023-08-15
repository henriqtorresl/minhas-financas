import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../models/login';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  authLogin!: Login;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // inicializando o formulário:
    this.loginForm = this.formBuilder.group({
      // Validators.compose => Forma de receber mais de um validators de uma vez...
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  login(): void {
    this.authLogin = Object.assign('', this.authLogin, this.loginForm.value);

    this.authLogin.email = this.authLogin.email.toLowerCase();

    this.authenticationService.login({email: this.authLogin.email, password: this.authLogin.password})
    .subscribe((user) => {
      if (user?.id) {
        this.router.navigateByUrl('dashboard');
      }
    }, 
    (error) => {
      this.snackBar.open('Ocorreu um erro no login', 'OK', {
        duration: 5000
      })
    });
  }

  sair(): void {
    this.authenticationService.sair();
    this.router.navigate(['auth', 'login']);
  }
}