import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../api-service/api-service.service';
import { CustomValidationService } from '../../app-validator/custom-validation-service';
import { Residence, User } from '../../app-interfaces/PartnerRegisterDTO';
import { CustomValidation } from '../../app-validator/custom-validation';
import { MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
interface PasswordError {
  passwordMismatch?: boolean;
}
@Component({
  selector: 'app-partner-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatDialogModule
  ],
  templateUrl: './partner-signup.component.html',
  styleUrl: './partner-signup.component.css',
})
export class PartnerSignupComponent {
  constructor(
    private apiService: ApiService,
    private validationService: CustomValidationService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PartnerSignupComponent>
  ) { }
  userForm!: FormGroup;
  ngOnInit(): void {
    // Initialize the form with FormBuilder
    this.userForm = this.fb.group(
      {
        userName: new FormControl('', [
          Validators.required,
          CustomValidation.nameValidation(3),
        ]),
        email: new FormControl('example@gmail.com', [
          Validators.required,
          CustomValidation.emailValidator(),
        ]),
        phone: new FormControl('8670731872', [
          Validators.required,
          CustomValidation.mobileValidation(),
        ]),
        password: new FormControl('Example@933', [
          Validators.required,
          CustomValidation.passwordValidator(),
        ]),
        confirmPassword: new FormControl('Example@933', [
          Validators.required,
          CustomValidation.passwordValidator(),
        ]),
        residenceName: new FormControl('', [
          Validators.required,
          CustomValidation.nameValidation(3),
        ]),
        residenceType: new FormControl('', [
          Validators.required,
          CustomValidation.selectionValidation(),
        ]),
        city: new FormControl('', [
          Validators.required,
          CustomValidation.textValidation(3, 200),
        ]),
        residenceAddress: new FormControl('', [
          Validators.required,
          CustomValidation.textValidation(5, 300),
        ]),

        distanceValue: new FormControl('0 km', [
          Validators.required,
          CustomValidation.textValidation(3, 10),
        ]),
      },
      {
        validators: CustomValidation.confirmPasswordValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  getNameError(controlName: string): string | null {
    const control = this.userForm.get(controlName);
    return control
      ? this.validationService.getNameValidationError(
        control,
        '*',
        '*',
        '*',
        '*',
        '*'
      )
      : null;
  }
  getEmailError(controlName: string): string | null {
    const control = this.userForm.get(controlName);
    return control
      ? this.validationService.getEmailValidatorError(control, '*', '*')
      : null;
  }
  getMobileError(controlName: string): string | null {
    const control = this.userForm.get(controlName);
    return control
      ? this.validationService.getMobileValidationError(control, '*', '*', '*')
      : null;
  }
  getPasswordError(controlName: string): string | null {
    const control = this.userForm.get(controlName);
    return control
      ? this.validationService.getPasswordValidatorError(control, '*', '*')
      : null;
  }
  getConfirmPasswordError(): string | null {
    return this.userForm.errors?.['passwordMismatch']
      ? this.validationService.getConfirmPasswordValidatorError(
        this.userForm,
        'Password Mismatch'
      )
      : null;
  }

  getResidenceNameError(controlName: string): string | null {
    const control = this.userForm.get(controlName);
    return control
      ? this.validationService.getNameValidationError(
        control,
        '*',
        '*',
        '*',
        '*',
        '*'
      )
      : null;
  }
  getResidenceTypeError(controlName: string): string | null {
    const control = this.userForm.get(controlName);
    return control
      ? this.validationService.getSelectionValidationError(control, '*')
      : null;
  }
  getCityError(controlName: string): string | null {
    const control = this.userForm.get(controlName);
    return control
      ? this.validationService.getTextValidationError(
        control,
        '*',
        '*',
        '*',
        '*',
        '*',
        '*'
      )
      : null;
  }
  getAddressError(controlName: string): string | null {
    const control = this.userForm.get(controlName);
    return control
      ? this.validationService.getTextValidationError(
        control,
        '*',
        '*',
        '*',
        '*',
        '*',
        '*'
      )
      : null;
  }

  getDistanceValueError(controlName: string): string | null {
    const control = this.userForm.get(controlName);
    return control
      ? this.validationService.getTextValidationError(
        control,
        '*',
        '*',
        '*',
        '*',
        '*',
        '*'
      )
      : null;
  }

  formSubmit() {
    this.markFormGroupTouched(this.userForm);
    if (this.userForm?.valid) {
      let user: any = {
        userName: this.userForm.get('userName')?.value,
        email: this.userForm.get('email')?.value,
        phone: this.userForm.get('phone')?.value,
        password: this.userForm.get('password')?.value,
        residence: [
          {
            residenceName: this.userForm.get('residenceName')?.value,
            residenceType: this.userForm.get('residenceType')?.value,
            city: this.userForm.get('city')?.value,
            residenceAddress: this.userForm.get('residenceAddress')?.value,
            distance: [
              {
                distanceFrom: this.userForm.get('city')?.value,
                distanceValue: this.userForm.get('distanceValue')?.value,
              },
            ],
          },
        ],
      };

      this.apiService.addPartner(user).subscribe({
        next: (value) => {
          this.userForm.reset();
          alert('Partner added successfully');
        },
        error: (err) => {
          console.log(err.message);
          console.log(user);
          alert('Add partner is abrogated!');
        },
        complete: () => {
          this.dialogRef.close();
        },
      });
    } else {
      alert('Invalid Partner Credintial!');

    }
  }
  // Function to mark all form controls as touched recursively
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
