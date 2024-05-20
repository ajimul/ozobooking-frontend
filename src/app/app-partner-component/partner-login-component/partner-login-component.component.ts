import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../token-service/token.service';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../user-service/user.service';
import { ApiService } from '../../api-service/api-service.service';
import { CustomValidation } from '../../app-validator/custom-validation';
import { CustomValidationService } from '../../app-validator/custom-validation-service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-partner-login-component',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './partner-login-component.component.html',
  styleUrl: './partner-login-component.component.css'
})
export class PartnerLoginComponentComponent {
  responsedata: any;
  loginform!: FormGroup;
  constructor(
    private service: ApiService,
    private route: Router,
    private user: UserService,
    private token: TokenService,
    private validationService: CustomValidationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: new FormControl('admin@gmail.com', [Validators.required]),
      password: new FormControl('admin', [Validators.required]),
      // email: new FormControl('', [Validators.required,CustomValidation.email_Validator()]),
      // password: new FormControl('',[Validators.required,CustomValidation.password_Validator()]),
    });
  }

  loginn() {
    if (this.loginform.valid) {
      this.service.loginn(this.loginform.value).subscribe(
        (value) => {
          this.responsedata = value;
          if (this.responsedata != null) {
            localStorage.removeItem;
            this.token.setAccessToken(this.responsedata.ozo_access_token);
            this.token.setRefreshToken(this.responsedata.ozo_access_token);
            this.user.initializeCurrentUser();
            this.route.navigate(['partner-home'], { replaceUrl: true });
          }
        },
        (error) => {
          console.error('An error occurred:', error);
          alert('login Faield!');
        }
      );
    }
    // this.route.navigate(['control-panel'], { replaceUrl: true });
  }
  getErrorEmailValidation(controlName: string): string | null {
    const control = this.loginform.get(controlName);
    return control
      ? this.validationService.getPasswordValidatorError(
          control,
          '*',
          '*'
        )
      : null;
  }
  getErrorPasswordValidation(controlName: string): string | null {
    const control = this.loginform.get(controlName);
    return control
      ? this.validationService.getPasswordValidatorError(
          control,
          '*',
          ':Password must contain at least 8 characters' +
            ' including uppercase, lowercase,' +
            'number, and special character.'
        )
      : null;
  }
}
