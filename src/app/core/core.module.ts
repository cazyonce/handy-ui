import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

// library
import { GLOBAL_HTTP_INTERCEPTOR_PROVIDERS } from './interceptor/providers.interceptor';
import { SigninGuard } from './guard/signin.guard';
import { PageService } from './service/page.service';


const system = [
  HttpClientModule,
];

const librarys = [];

const PROVIDERS = [
  ...GLOBAL_HTTP_INTERCEPTOR_PROVIDERS,
  SigninGuard,
  PageService
]

// 把那些数量庞大、辅助性的、只实例化一次的类收集到核心模块中，让特性模块的结构更清晰简明。
@NgModule({
  declarations: [],
  imports: [...system, ...librarys],
  providers: [...PROVIDERS],
})
export class CoreModule { }
