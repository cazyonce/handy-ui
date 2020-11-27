import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../layout/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { ApiConsoleComponent } from './components/api/api-console/api-console.component';
import { ApiMappingComponent } from './components/api/api-mapping/api-mapping.component';
import { APIMappingListResolve } from './guard/resolve/api-mapping-list.resolve';
import { ApiMappingAddComponent } from './components/api/api-mapping-add/api-mapping-add.component';

const adminRouters: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // resolve: [LoginedInfoResolve],
    children: [
      {
        path: 'sql_api',
        children: [
          { path: 'console', component: ApiConsoleComponent, data: { breadcrumb: 'Console' } },
          { path: 'mapping', resolve: { paging: APIMappingListResolve }, component: ApiMappingComponent, data: { breadcrumb: 'Mapping' } },
          {
            path: 'mapping', children: [
              { path: 'add', component: ApiMappingAddComponent, data: { breadcrumb: 'Add' } },
            ], data: { breadcrumb: 'Mapping' }
          },

          // {
          //   path: 'client',
          //   children: [
          //     { path: ':id/access_setting', resolve: { paging: ProxyAccessSettingListResolve }, component: ProxyAccessSettingListComponent, data: { breadcrumb: '访问设置' } }
          //   ],
          //   data: { breadcrumb: '代理客户端' }
          // }
        ],
        data: { breadcrumb: 'API' }
      },
      { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(adminRouters)], // 线上环境
  providers: []
})
export class RouteRoutingModule { }
