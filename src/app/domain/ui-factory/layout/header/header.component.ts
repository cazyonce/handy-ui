import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormControlValidator } from 'src/app/core/validator/form-control.validator';
import { APIMappingService } from '../../core/service/api-mapping.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isVisibleUpdatePassword;
  validateForm: FormGroup;

  constructor(private apiMappingService: APIMappingService,
    private router: Router,
    private formValidator: FormControlValidator,
    private injector: Injector) {

    let groups: any = [];
    groups['oldPassword'] = ['', [Validators.required, this.formValidator.noSpace]];
    groups['newPassword'] = ['', [Validators.required, this.formValidator.noSpace]];
    this.validateForm = this.injector.get(FormBuilder).group(groups);
  }

  ngOnInit() {
  }

  // onSignout(): void {
  //   this.adminInfoService.signout().subscribe(res => {
  //     this.router.navigateByUrl("admin/signin");
  //   });
  // }

  // showModal(): void {
  //   this.isVisibleUpdatePassword = true;
  //   this.validateForm.reset();
  // }

  // handleOk(): void {
  //   for (const i in this.validateForm.controls) {
  //     this.validateForm.controls[i].markAsDirty();
  //     this.validateForm.controls[i].updateValueAndValidity();
  //   }
  //   if (!this.validateForm.valid) {
  //     return;
  //   }
  //   this.injector.get(AdminService).updatePassword(this.validateForm.value).subscribe(res => {
  //     this.isVisibleUpdatePassword = false;
  //     this.injector.get(NzMessageService).success("修改成功");
  //   }, err => this.injector.get(NzMessageService).error(err));
  // }

  // handleCancel(): void {
  //   this.isVisibleUpdatePassword = false;
  // }

}
