import { FormFieldService } from 'src/app/domain/ui-factory/core/service/component/form-field.service';

export class FormInputService extends FormFieldService {
    constructor(labelText: string, formControlName: string, describe?: string) {
        super()
        super.type = "text";
        super.placeholder = "请输入。。。";
        super.labelText = labelText;
        super.formControlName = formControlName;
        super.describe = describe;
    }
}