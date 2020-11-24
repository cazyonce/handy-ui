import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { Exception504Component } from './exception504/exception504.component';

registerLocaleData(en);
const system = [BrowserModule, BrowserAnimationsModule];
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
@NgModule({
  // declarations（可声明对象表） —— 那些属于本 NgModule 的组件、指令、管道。
  declarations: [AppComponent, Exception504Component],
  // imports（导入表） —— 那些导出了本模块中的组件模板所需的类的其它模块。
  imports: [...system, CoreModule, AppRoutingModule, FormsModule, HttpClientModule],
  bootstrap: [AppComponent],
  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons } ],
  // providers:[...httpInterceptorProviders]
})
export class AppModule { }
