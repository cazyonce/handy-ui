import { NgModule } from '@angular/core';

const COMPONENTS = [
  HomeComponent
];

import { SharedModule } from 'src/app/shared/shared.module';
import { RouteRoutingModule } from './route-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ButtonComponent } from './components/product/button/button.component';


const MODULES = [SharedModule, RouteRoutingModule];

const RESOLVES = [

];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES, HttpClientModule],
  exports: [...MODULES],
  providers: [...RESOLVES]
})
export class RouteModule { }
