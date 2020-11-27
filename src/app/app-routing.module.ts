import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninGuard } from './core/guard/signin.guard';

const router: Routes = [
  { path: '', loadChildren: () => import('./domain/console/console.module').then(m => m.ConsoleModule), data: { breadcrumb: null }  },
  { path: 'ui_factory', loadChildren: () => import('./domain/ui-factory/ui-factory.module').then(m => m.UIFactoryModule), data: { breadcrumb: null }  },
  { path: 'admin', canLoad: [SigninGuard], loadChildren: () => import('./domain/console/console.module').then(m => m.ConsoleModule), data: { breadcrumb: null } },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(router)], // 线上环境
  // imports: [RouterModule.forRoot(router, { useHash: true })], // 开发环境
})

export class AppRoutingModule { }
