import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout/layout.component';
import { HomeComponent } from './components/home/home.component';

const adminRouters: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // resolve: [LoginedInfoResolve],
    children: [
      { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(adminRouters)], // 线上环境
  providers: []
})
export class RouteRoutingModule { }
