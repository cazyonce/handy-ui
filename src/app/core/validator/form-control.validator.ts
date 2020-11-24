import { AbstractControl } from "@angular/forms";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class FormControlValidator {

    noSpace(control: AbstractControl) {
        let value: String = control.value;
        return null != value && value.indexOf(" ") == -1 ? null : { message: "不能存在空格！" };
    }
}