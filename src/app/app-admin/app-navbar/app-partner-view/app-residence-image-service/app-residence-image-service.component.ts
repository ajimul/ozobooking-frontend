import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../api-service/api-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomValidation } from '../../../../app-validator/custom-validation';
import { ResidenceImage } from '../../../../app-interface/Residence';
import { CustomValidationService } from '../../../../app-validator/custom-validation-service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-app-residence-image-service',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app-residence-image-service.component.html',
  styleUrl: './app-residence-image-service.component.css'
})
export class AppResidenceImageServiceComponent {
  residenceImage: ResidenceImage[] = []
  residanceForm!: FormGroup;
  constructor(
    private apiService: ApiService,
    private validationService: CustomValidationService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AppResidenceImageServiceComponent>) { }


  ngOnInit(): void {
    this.residanceForm = this.fb.group({
      residenceImagesRefId: new FormControl('14', [Validators.required,
      CustomValidation.idValidation(1),]),
      imgSrc: new FormControl("", [
        Validators.required, CustomValidation.textValidation(1, 100)
      ]),
    })
  }

  getIdError(controlName: string): string | null {
    const control = this.residanceForm.get(controlName);
    return control
      ? this.validationService.getIdValidationError(control) : null;
  }
  getFileError(controlName: string): string | null {
    const control = this.residanceForm.get(controlName);
    return control
      ? this.validationService.getTextValidationError(control, '*', '*', '*', '*', '*', '*') : null;
  }


  file: File[] = [];
  onFileSelected(event: any): void {
    const selectedFiles: FileList = event.target.files;
    if (selectedFiles) {
      this.file = Array.from(selectedFiles) as File[];
    }
  }
  addResidenceImage() {
    // Check if the form is valid
    if (this.residanceForm.invalid) {
      this.residanceForm.markAllAsTouched();
      return;
    }

    // Check if a file is selected
    if (!this.file || this.file.length === 0) {
      alert('Please select a file.');
      return;
    }

    // Proceed with file upload if the form is valid and a file is selected
    const files: File[] = this.file;
    this.apiService.uploadResidenceImages(14, files).subscribe({
      next: (response) => {
        this.file = [];
        this.residanceForm.get('imgSrc')?.reset(); // Reset the value of the file input control
        alert(response.message);
      },
      error: (error) => {
        console.log(JSON.stringify(error))
        let errorMessage = '';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } 
        else if (error.message) {
          errorMessage = error.message;
        }
        console.log('Error Message: ', errorMessage);
        alert(errorMessage);
      },
      complete: () => { console.log('complete'); }
    });
  }


}
