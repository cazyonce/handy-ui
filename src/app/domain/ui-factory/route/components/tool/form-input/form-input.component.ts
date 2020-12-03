import { Component, OnInit } from '@angular/core';
import { FormInputService } from './form-input.service';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements OnInit {

  // inputService: FormInputService = new FormInputService();

  constructor() { }

  ngOnInit(): void {
  }

}
