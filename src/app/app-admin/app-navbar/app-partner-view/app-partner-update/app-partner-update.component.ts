import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
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

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../../../api-service/api-service.service';
import { CustomValidationService } from '../../../../app-validator/custom-validation-service';
import { AppPartnerSignupComponent } from '../app-partner-signup/app-partner-signup.component';
import { CustomValidation } from '../../../../app-validator/custom-validation';
import { Residence } from '../../../../app-interface/Residence';
@Component({
  selector: 'app-app-partner-update',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './app-partner-update.component.html',
  styleUrl: './app-partner-update.component.css',
})
export class AppPartnerUpdateComponent {
  name: string = '';
  constructor(
    private apiService: ApiService,
    private validationService: CustomValidationService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Residence,
    private dialogRef: MatDialogRef<AppPartnerUpdateComponent>) {}
  userForm!: FormGroup;

  ngOnInit(): void {
    // Initialize the form with FormBuilder
    this.userForm = this.fb.group(
      {
        residenceName: new FormControl(this.data.residenceName, [
          Validators.required,
          CustomValidation.nameValidation(3),
        ]),
        residenceType: new FormControl(this.data.residenceType, [
          Validators.required,
          CustomValidation.selectionValidation(),
        ]),
        residenceLocation: new FormControl(this.data.residenceLocation, [
          Validators.required,
          CustomValidation.textValidation(3, 20),
        ]),
        residenceAddress: new FormControl(this.data.residenceAddress, [
          Validators.required,
          CustomValidation.textValidation(5, 150),
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
  getResidenceLocationError(controlName: string): string | null {
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

  formSubmit() {
    this.markFormGroupTouched(this.userForm);
    if (this.userForm?.valid) {
      let residence: any = {
        residenceId: this.data.residenceId,
        residenceUser_refId: this.data.residenceUser_refId,
        residenceName: this.userForm.get('residenceName')?.value,
        residenceType: this.userForm.get('residenceType')?.value,
        residenceLocation: this.userForm.get('residenceLocation')?.value,
        residenceAddress: this.userForm.get('residenceAddress')?.value,
        isActive: this.data.isActive,
        residenceRating: this.data.residenceRating,
      };

      this.apiService.updateResidences(residence).subscribe({
        next: (response) => {
          alert(response.message);
        },
        error: (error) => {
          if (error.status === 404) {
            error;
          } else {
            console.error(error);
          }
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