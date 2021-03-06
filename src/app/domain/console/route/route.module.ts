import { NgModule } from '@angular/core';

const COMPONENTS = [
  HomeComponent
];

import { SharedModule } from 'src/app/shared/shared.module';
import { RouteRoutingModule } from './route-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { APIMappingListResolve } from './guard/resolve/api-mapping-list.resolve';
import { ApiConsoleComponent } from './components/api/api-console/api-console.component';
import { ApiMappingComponent } from './components/api/api-mapping/api-mapping.component';
import { ApiMappingAddComponent } from './components/api/api-mapping-add/api-mapping-add.component';


const MODULES = [SharedModule, RouteRoutingModule];

const RESOLVES = [
  APIMappingListResolve
];

@NgModule({
  declarations: [...COMPONENTS, ApiConsoleComponent, ApiMappingComponent, ApiMappingAddComponent],
  imports: [...MODULES, HttpClientModule],
  exports: [...MODULES],
  providers: [...RESOLVES]
})
export class RouteModule { }
