import { Component, OnInit, Input } from '@angular/core';
import { FormFieldService } from '../../../core/service/component/form-field.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'product-config',
  templateUrl: './product-config.component.html',
  styleUrls: ['./product-config.component.css']
})
export class ProductConfigComponent implements OnInit {

  @Input() configs: Array<FormFieldService>;
  validateForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let controls = {};
    for (const config of this.configs) {
      controls[config.formControlName] = [config.defualtValue];
    }
    console.log(controls, this.configs)
    this.validateForm = this.formBuilder.group(controls);
  }

}
