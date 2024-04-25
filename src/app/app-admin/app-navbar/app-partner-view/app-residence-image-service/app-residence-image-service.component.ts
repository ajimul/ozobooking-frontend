import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../api-service/api-service.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CustomValidation } from '../../../../app-validator/custom-validation';
import { ResidenceImage } from '../../../../app-interface/Residence';
import { CustomValidationService } from '../../../../app-validator/custom-validation-service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { catchError } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-app-residence-image-service',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatTableModule, MatDialogModule],
  templateUrl: './app-residence-image-service.component.html',
  styleUrl: './app-residence-image-service.component.css'
})
export class AppResidenceImageServiceComponent {
  apiServerUrl = environment.apiBaseUrl;
  residenceImage: ResidenceImage[] = [];
  showDeleteConfirmation = false;
  residanceForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private validationService: CustomValidationService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private elRef: ElementRef,
    private dialogRef: MatDialogRef<AppResidenceImageServiceComponent>) { }

    showConfirmDelete() {
      this.showDeleteConfirmation = true; // Show confirmation dialog
    }
  ngOnInit(): void {
    this.getResidenceImages();
    this.residanceForm = this.fb.group({
      residenceImagesRefId: new FormControl(this.data.residenceId, [Validators.required,
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
  stopParentPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  file: File[] = [];
  onFileSelected(event: any): void {
    console.log('event')
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
    this.apiService.uploadResidenceImages(this.data.residenceId, files).subscribe({
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
      complete: () => {
        this.getResidenceImages();
        console.log('complete');
      }
    });
  }
  getResidenceImages() {
    this.apiService.getAllResidenceImages().subscribe({
      next: (value) => {
        this.residenceImage = value;
      },
      error: (err) => {

      },
      complete: () => {
      },
    })
  }



  deleteAction(id: any, fileName: any) {

    if (confirm("Are you sure you want to delete this image?")) {
      this.apiService.deleteResidenceImageById(id, fileName)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 204) {//204, it indicates a successful request so it never show any were use only for understandng purpose
            console.log('Deleted successfully');
          } else if (error.status === 404) {
            console.error('Not found');
          } else {
            console.error('An error occurred:', error);
          }
          throw error;
        })
      )
      .subscribe({
        next: (response) => {
          alert('Deleted successfully');
        },
        error: (error) => {
          alert('File Not Found!');
        },
        complete: () => {
          this.getResidenceImages()
        },
      })
      this.showDeleteConfirmation = false; 
    } else {
      this.showDeleteConfirmation = false;
    }
  }
}
