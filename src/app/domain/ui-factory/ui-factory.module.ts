import { NgModule } from '@angular/core';
import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [LayoutModule, CoreModule],
})
export class UIFactoryModule { }
