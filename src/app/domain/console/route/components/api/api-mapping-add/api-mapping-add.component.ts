import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors, FormBuilder, Validators } from '@angular/forms';
import { Observer, Observable } from 'rxjs';

@Component({
  selector: 'app-api-mapping-add',
  templateUrl: './api-mapping-add.component.html',
  styleUrls: ['./api-mapping-add.component.css']
})
export class ApiMappingAddComponent implements OnInit {
  headerNameOptions = [{
    value: 'fujian',
    label: 'Fujian' ,isLeaf: true
  }];
  values;
  
  validateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      name: [''],
      executeSQL: [''],
      path: ['', [Validators.required], [this.userNameAsyncValidator]],
      describe: [''],
      status: [0, [Validators.required]],
      requestHeader: ['']

    });
  }

  ngOnInit(): void {
  }


  submitForm(value: { userName: string; email: string; password: string; confirm: string; comment: string }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };


}
