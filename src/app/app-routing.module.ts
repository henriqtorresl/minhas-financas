import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)},   // Lazyload do módulo de dashboard
  {path: 'categorias', loadChildren: () => import('./features/categorias/categorias.module').then(m => m.CategoriasModule)},   // Lazyload do módulo de cateforias
  {path: 'entradas', loadChildren: () => import('./features/entradas/entradas.module').then(m => m.EntradasModule)},   // Lazyload do módulo de cateforias
  {path: 'auth', loadChildren: () => import('./commom/auth/auth.module').then(m => m.AuthModule)} // Lazyload do módulo de autenticação (auth)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
