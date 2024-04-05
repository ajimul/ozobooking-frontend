import { Component, Inject } from '@angular/core';
import { ApiService } from '../../../../api-service/api-service.service';
import { CustomValidationService } from '../../../../app-validator/custom-validation-service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-room-policy-service',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './app-room-policy-service.component.html',
  styleUrl: './app-room-policy-service.component.css'
})
export class AppRoomPolicyServiceComponent {
  constructor(
    private apiService: ApiService,
    private validationService: CustomValidationService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AppRoomPolicyServiceComponent>) { }
    ngOnInit(): void {

    }
}
