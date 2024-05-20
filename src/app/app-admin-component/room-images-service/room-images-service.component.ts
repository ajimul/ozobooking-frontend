import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { environment } from '../../../environments/environment';
import { ResidenceRooms, ResidenceRoomsImages } from '../../app-interface/Residence';
import { ApiService } from '../../api-service/api-service.service';
import { CustomValidationService } from '../../app-validator/custom-validation-service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CustomValidation } from '../../app-validator/custom-validation';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-room-images-service',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatTableModule, MatDialogModule],
  templateUrl: './room-images-service.component.html',
  styleUrl: './room-images-service.component.css'
})
export class RoomImagesServiceComponent {
  apiServerUrl = environment.apiBaseUrl;
  residenceRoomsImages: ResidenceRoomsImages[] = [];
  showDeleteConfirmation = false;
  // dataSource = new MatTableDataSource<ResidenceRoomsImages>(this.residenceRoomsImages);
  roomImageForm!: FormGroup;
  // roomImageTableColumns = [
  //   'imgSrc',
  //   'deleteAction',
  // ];
  constructor(
    private apiService: ApiService,
    private validationService: CustomValidationService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ResidenceRooms,
    private dialogRef: MatDialogRef<RoomImagesServiceComponent>) {
    this.setRoomImages();

  }


  setRoomImages() {
    this.residenceRoomsImages = Array.from(this.data.roomsImages!)
  }

  setFormField() {
    this.roomImageForm = this.fb.group({
      imagResidenceRoom_refId: new FormControl(this.data.roomId, [Validators.required,
      CustomValidation.idValidation(1),]),
      imgSrc: new FormControl("", [
        Validators.required, CustomValidation.textValidation(1, 100)
      ]),
    })
  }
  showConfirmDelete() {
    this.showDeleteConfirmation = true; // Show confirmation dialog
  }
  stopParentPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  ngOnInit(): void {
    this.setFormField();
  }
  // Validation
  getIdError(controlName: string): string | null {
    const control = this.roomImageForm.get(controlName);
    return control
      ? this.validationService.getIdValidationError(control) : null;
  }
  getFileError(controlName: string): string | null {
    const control = this.roomImageForm.get(controlName);
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
  addRoomImage() {
    // Check if the form is valid
    if (this.roomImageForm.invalid) {
      this.roomImageForm.markAllAsTouched();
      return;
    }

    // Check if a file is selected
    if (!this.file || this.file.length === 0) {
      alert('Please select a file.');
      return;
    }

    // Proceed with file upload if the form is valid and a file is selected
    const files: File[] = this.file;
    this.apiService.uploadResidenceRoomImages(this.data.roomId!, files).subscribe({
      next: (response) => {
        this.file = [];
        this.roomImageForm.get('imgSrc')?.reset(); // Reset the value of the file input control
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
        this.getRoomImages();
      }
    });
  }

  getRoomImages() {
    this.apiService.getRoomImagesByRoomId(this.data.roomId!).subscribe({
      next: (value) => {
        this.residenceRoomsImages = [];
        this.residenceRoomsImages = value;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
      },
    })
  }
  deleteAction(id: any, fileName: any) {
    if (confirm("Are you sure you want to delete this image?")) {
    this.apiService.deleteResidenceRoomImageById(id, fileName)
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
          this.getRoomImages()
        },
      })
      this.showDeleteConfirmation = false; 
    } else {
      this.showDeleteConfirmation = false;
    }
  }
}