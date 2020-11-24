import { NgModule } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzResultModule } from 'ng-zorro-antd/result';
@NgModule({
    exports: [

        NzButtonModule,
        NzCheckboxModule,
        NzFormModule,
        NzIconModule,
        NzInputModule,
        NzInputNumberModule,
        NzMessageModule,
        NzModalModule,
        NzRadioModule,
        NzRateModule,
        NzSwitchModule,
        NzTableModule,
        NzTabsModule,
        NzTagModule,
        NzResultModule,
    ]
})

export class NgZorroAntdModule {

}
