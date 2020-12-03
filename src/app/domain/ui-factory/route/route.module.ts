import { NgModule } from '@angular/core';

const COMPONENTS = [
  HomeComponent, ProductConfigComponent
];

import { SharedModule } from 'src/app/shared/shared.module';
import { RouteRoutingModule } from './route-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ButtonComponent } from './components/product/button/button.component';
import { FormInputComponent } from './components/tool/form-input/form-input.component';
import { FormRadioComponent } from './components/tool/form-radio/form-radio.component';
import { ProductConfigComponent } from './components/product-config/product-config.component';
import { AdjustComponent } from './components/tool/adjust/adjust.component';
import { ElementToolService } from '../core/service/component/element-tool.service';


const MODULES = [SharedModule, RouteRoutingModule];

const RESOLVES = [
  ElementToolService
];

@NgModule({
  declarations: [...COMPONENTS, FormInputComponent, FormRadioComponent, AdjustComponent],
  imports: [...MODULES, HttpClientModule],
  exports: [...MODULES],
  providers: [...RESOLVES]
})
export class RouteModule { }
