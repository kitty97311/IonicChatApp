import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'crias',
    pathMatch: 'full'
  },
  {
    path: 'crias',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/crias/crias.module').then( m => m.CriasPageModule)
  },
  {
    path: 'configuracion',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'crias-detalle/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/crias-detalle/crias-detalle.module').then( m => m.CriasDetallePageModule)
  },
  {
    path: 'pesaje',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pesaje/pesaje.module').then( m => m.PesajePageModule)
  },
  {
    path: 'pesaje-detalle/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pesaje-detalle/pesaje-detalle.module').then( m => m.PesajeDetallePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
