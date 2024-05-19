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
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';

@Component({
  selector: 'app-client-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './client-login.component.html',
  styleUrl: './client-login.component.css'
})
export class ClientLoginComponent implements OnInit {
  responsedata: any;
  loginform!: FormGroup;
  constructor(
    private service: ApiService,
    private authService: UserService,
    private route: Router,
    private user: UserService,
    private token: TokenService,
    private validationService: CustomValidationService,
    private fb: FormBuilder,private dialogRef: MatDialogRef<ClientLoginComponent>
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
            this.userIsPresent();
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
  userIsPresent(){
    this.authService.currentUser$
      .pipe(
        map((user) => {
          if (user) {
            this.dialogRef.close({ success: true });
          } else {
            this.dialogRef.close({ success: false });
          }
        })
      )
      .subscribe();
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
