export class FormFieldService {
    labelText: string;
    formControlName: string;
    type: "text" | "radio" | "file";
    placeholder: string;
    defualtValue: any = null;
    describe: string;
}