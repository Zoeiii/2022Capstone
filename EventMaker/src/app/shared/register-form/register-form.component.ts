import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  @Input() formHeader = 'Templated Header for form, please change to your own';
  @Input() cities!: Array<City>;
  @Input() selectedCity!: City;
  @Input() name = 'Default Name';
  @Input() dropDown = 'Defalut DropDown';
  @Input() calendar1!: string;
  @Input() calendar2!: string;
  @Input() submitButton = 'Create';
  regForm!: FormGroup;
  submit!: boolean;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.regForm = new FormGroup({
      [this.name]: new FormControl(null, [Validators.required]),
      [this.dropDown]: new FormControl(null, [Validators.required]),
      [this.calendar1]: new FormControl(null, [Validators.required]),
      [this.calendar2]: new FormControl(null, [Validators.required]),
    });

    console.log('in register form: ', this.regForm);
  }

  onSubmit(formValues: any): void {
    this.submit = true;
    console.log(this.regForm);
    console.log('submit: ', formValues);
  }
}
