import { NgModule } from '@angular/core';
import { APIMappingHttp } from './http/api-mapping.http';
import { APIMappingService } from './service/api-mapping.service';

const HTTP = [
  APIMappingHttp
];

const SERVICES = [
  APIMappingService
];
// 把那些数量庞大、辅助性的、只实例化一次的类收集到核心模块中，让特性模块的结构更清晰简明。
@NgModule({
  imports: [],
  providers: [...HTTP, ...SERVICES]
})
export class CoreModule { }
