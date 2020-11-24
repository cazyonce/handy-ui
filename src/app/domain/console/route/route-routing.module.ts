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
      // {
      //   path: 'proxy',
      //   children: [
      //     { path: 'client', resolve: { paging: ProxyClientResolve }, component: ProxyClientListComponent, data: { breadcrumb: '代理客户端' } },
      //     {
      //       path: 'client',
      //       children: [
      //         { path: ':id/access_setting', resolve: { paging: ProxyAccessSettingListResolve }, component: ProxyAccessSettingListComponent, data: { breadcrumb: '访问设置' } }
      //       ],
      //       data: { breadcrumb: '代理客户端' }
      //     }
      //   ],
      //   data: { breadcrumb: '网络代理' }
      // },
      { path: 'home', component: HomeComponent, data: { breadcrumb: '首页' } },
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(adminRouters)], // 线上环境
  providers: []
})
export class RouteRoutingModule { }
