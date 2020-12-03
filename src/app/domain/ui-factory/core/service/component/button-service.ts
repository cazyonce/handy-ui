import { MyNgZorroAntdModule } from 'src/app/shared/my-ng-zorro-antd.module';
import { Component, NgModule, TypeDecorator, Compiler, ViewContainerRef } from '@angular/core';
import { Type } from '@angular/compiler/src/core';
import { FormFieldService } from './form-field.service';
import { FormInputService } from '../../../route/components/tool/form-input/form-input.service';

export class ButtonService {

    formFileds: Array<FormFieldService> = [
        new FormInputService("输入", "input_test", "这个是输入描述")
    ];
    getName(): string {
        return "Button";
    }

    getComponentConfigs(): Array<FormFieldService> {
        return this.formFileds;
    }

    generateComponent(_compiler: Compiler, vc: ViewContainerRef) {
        const template = '<button nz-button nzType="primary">Button</button>';

        const tmpCmp = Component({ template: template })(class {
        });
        const tmpModule = NgModule({ declarations: [tmpCmp], imports: [MyNgZorroAntdModule] })(class {
        });

        _compiler.compileModuleAndAllComponentsAsync(tmpModule)
            .then((factories) => {
                const f = factories.componentFactories[0];
                const cmpRef = vc.createComponent(f);
                cmpRef.instance.name = 'dynamic';
            })


    }
}