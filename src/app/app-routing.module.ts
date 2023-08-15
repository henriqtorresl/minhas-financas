import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './commom/auth.guard';

const routes: Routes = [
  // adicionei o guarda de rotas (canActivate) em todas as rotas que necessitam de segurança..
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]},   // Lazyload do módulo de dashboard
  {path: 'categorias', loadChildren: () => import('./features/categorias/categorias.module').then(m => m.CategoriasModule), canActivate: [AuthGuard]},   // Lazyload do módulo de cateforias
  {path: 'entradas', loadChildren: () => import('./features/entradas/entradas.module').then(m => m.EntradasModule), canActivate: [AuthGuard]},   // Lazyload do módulo de cateforias
  {path: 'auth', loadChildren: () => import('./commom/auth/auth.module').then(m => m.AuthModule)} // Lazyload do módulo de autenticação (auth), obs.: n preciso passar meu guarda de rotas nesse módulo, pois quero que essa seja minha única rota pública (qualquer pessoa pode acessar o módulo de login...)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
