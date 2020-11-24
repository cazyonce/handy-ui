import { NgModule } from '@angular/core';

import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
const COMPONENTS = [
  ContentComponent,
  HeaderComponent,
  SidebarComponent,
  LayoutComponent
];

import { RouteModule } from '../route/route.module';
const MODULES = [RouteModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES]
})
export class LayoutModule { }
