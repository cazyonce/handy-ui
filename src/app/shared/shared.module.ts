import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// ReactiveFormsModule 响应式表单模块 FormsModule 模块表单
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
const SYSTEMS = [CommonModule, ReactiveFormsModule, FormsModule];

import { NgZorroAntdModule } from './ng-zorro-antd.module';

const LIBRARYS = [NgZorroAntdModule];

import { ServerExceptionComponent } from './components/exception/server-exception/server-exception.component';
import { HtmlPipe } from './pipe/html.pipe';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumbComponent } from './components/layout/breadcrumb/breadcrumb.component';
const CONPONENTS = [
  ServerExceptionComponent,
  BreadcrumbComponent,
];

const PIPES = [HtmlPipe];

// 不能删除
const routers: Routes = [];

// 声明那些可能被特性模块引用的可复用组件、指令和管道。 
@NgModule({
  declarations: [...CONPONENTS, ...PIPES],
  imports: [...SYSTEMS, ...LIBRARYS, RouterModule.forChild(routers)],
  exports: [...SYSTEMS, ...LIBRARYS, ...CONPONENTS, ...PIPES, RouterModule],
})
export class SharedModule { }
