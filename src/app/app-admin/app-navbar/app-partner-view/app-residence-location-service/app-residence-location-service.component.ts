import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../../api-service/api-service.service';
import { CustomValidationService } from '../../../../app-validator/custom-validation-service';
import { AppRoomImagesServiceComponent } from '../app-room-images-service/app-room-images-service.component';

@Component({
  selector: 'app-app-residence-location-service',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, MatTableModule],
  templateUrl: './app-residence-location-service.component.html',
  styleUrl: './app-residence-location-service.component.css'
})
export class AppResidenceLocationServiceComponent {

  constructor(
    private apiService: ApiService,
    private validationService: CustomValidationService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AppRoomImagesServiceComponent>) { }
 ngOnInit(): void {}
}
