import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormsModule, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../../api-service/api-service.service';
import { CustomValidationService } from '../../../../app-validator/custom-validation-service';
import { AppRoomImagesServiceComponent } from '../app-room-images-service/app-room-images-service.component';
import { Distance, Residence } from '../../../../app-interface/Residence';
import { CustomValidation } from '../../../../app-validator/custom-validation';
import { DistanceDTO } from '../../../../app-interface/DistanceDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-app-residence-location-service',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatTableModule, FormsModule, MatDialogModule],
  templateUrl: './app-residence-location-service.component.html',
  styleUrl: './app-residence-location-service.component.css'
})
export class AppResidenceLocationServiceComponent {
  [x: string]: any;
  roomType: any;
  roomAvailability: any;
  roomBedType: any;
  roomPrice: any;
  roomTradingPrice: any;
  roomDiscount: any;
  roomDescription: any;
  showDeleteConfirmation = false;
  residenceDistance: DistanceDTO[] = []
  residenceDistanceForm!: FormGroup
  dataSource = new MatTableDataSource<DistanceDTO>(this.residenceDistance);
  tableColumns = [
    'distanceFrom',
    'distanceValue',
    'action',
  ];
  constructor(
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: Residence,
    private validationService: CustomValidationService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AppResidenceLocationServiceComponent>,
    private cdr: ChangeDetectorRef
  ) {

  }
  resiAmenGroupName: any = "";
  createSubmitForm() {

    this.residenceDistanceForm = this.fb.group({
      distanceResidence_refId: new FormControl(this.data.residenceId, [Validators.required, CustomValidation.idValidation(1)]),
      distanceFrom: new FormControl('', [Validators.required, CustomValidation.textValidation(1, 100)]),
      distanceValue: new FormControl('', [Validators.required, CustomValidation.textValidation(1, 100)]),

    })
  }
  getIdError(controlName: string): string | null {
    const control = this.residenceDistanceForm.get(controlName);
    return control
      ? this.validationService.getIdValidationError(control) : null;
  }
  getTextError(controlName: string): string | null {
    const control = this.residenceDistanceForm.get(controlName);
    return control
      ? this.validationService.getTextValidationError(control, '*', '*', '*', '*', '*', '*') : null;
  }

  isPositiveNumber(num: number | null | undefined): boolean {
    return num !== null && num !== undefined && !isNaN(num) && num > 0;
  }
  isValuePresent(text: any | null | undefined): boolean {
    return text !== null && text !== undefined && typeof text === 'string' && text.trim().length > 0;
  }
  isValidInteger(value: string): boolean {
    return /^\d+$/.test(value);
  }
  isValidDecimal(value: string): boolean {
    return /^\d*(?:\.\d+)?$/.test(value);
  }

  nonControl_textValidation(getfieldValue: any, element: DistanceDTO) {
    const fieldValue = getfieldValue;
    const min_length = 1;
    const max_length = 100;

    if (fieldValue === null || fieldValue === undefined || typeof fieldValue !== 'string') {
      element.errorMessage = '*';
      return;
    }

    const trimmedValue = fieldValue.trim();
    const length = trimmedValue.length;

    if (length !== fieldValue.length) {
      element.errorMessage = '*';
      return;
    }

    if (isNaN(min_length) || isNaN(max_length) || min_length < 0 || max_length < 0) {
      element.errorMessage = '*';
      return;
    }

    if (min_length > max_length) {
      element.errorMessage = '*';
      return;
    }

    if (max_length > 0 && length > max_length) {
      element.errorMessage = `*`;
      return;
    }

    if (min_length > 0 && length < min_length) {
      element.errorMessage = `*`;
      return;
    }

    element.errorMessage = ''; // Clear errorMessage if all validations pass
  }
  getTableData(): void {

    this.apiService.getResidencesById(this.data.residenceId).subscribe({
      next: (value) => {
        this.residenceDistance = [];
        let newData: DistanceDTO[] = []
        value.distance.forEach(rr => {
          newData.push({
            distanceId: rr.distanceId,
            distanceResidence_refId: rr.distanceResidence_refId,
            distanceFrom: rr.distanceFrom,
            distanceValue: rr.distanceValue,
            errorMessage: ''
          });

        })
        this.dataSource.data = [];
        this.residenceDistance = newData
      },
      error: (error) => {
        console.log(JSON.stringify(error))
        alert('Error')
      },
      complete: () => {
        this.dataSource = new MatTableDataSource<Distance>(this.residenceDistance);
      }
    });
  }
  setRoomTableData(): void {
    // Clear the array before populating it with new data
    this.residenceDistance = [];
    let newData: DistanceDTO[] = []

    this.data.distance.forEach(rr => {
      newData.push({
        distanceId: rr.distanceId,
        distanceResidence_refId: rr.distanceResidence_refId,
        distanceFrom: rr.distanceFrom,
        distanceValue: rr.distanceValue,
        errorMessage: ''
      });

    });
    // });
    this.dataSource.data = [];
    this.residenceDistance = newData
    this.dataSource = new MatTableDataSource<Distance>(this.residenceDistance);

  }
  showConfirmDelete() {
    this.showDeleteConfirmation = true; // Show confirmation dialog
  }

  ngOnInit(): void {
    this.setRoomTableData();
    this.createSubmitForm();
  }





  isDescendant(parent: HTMLElement, child: HTMLElement): boolean {
    let node = child.parentNode;
    while (node != null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  formSubmit() {
    this.markFormGroupTouched(this.residenceDistanceForm);
    if (this.residenceDistanceForm.valid) {
      const payload: DistanceDTO = {
        distanceResidence_refId: this.residenceDistanceForm.get('distanceResidence_refId')?.value,
        distanceFrom: this.residenceDistanceForm.get('distanceFrom')?.value,
        distanceValue: this.residenceDistanceForm.get('distanceValue')?.value,
      };
      this.apiService.addUpdateResidenceDistance(payload).subscribe({
        next: (value) => {
          alert('Success')
        },
        error: (error) => {
          alert('Internal Server Error!')
        },
        complete: () => {
          this.residenceDistanceForm.patchValue({
            distanceFrom: '',
            distanceValue: ''
          })

          this.getTableData();

        }
      })
    } else {
      alert('in-valid form submit')
    }

  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // isInputValid: boolean = true;


  updateDistance(element: DistanceDTO): void {
    console.log(element)
    if (element.errorMessage === '') {
      const payload: Distance = {
        distanceId: element.distanceId,
        distanceResidence_refId: element.distanceResidence_refId,
        distanceFrom: element.distanceFrom,
        distanceValue: element.distanceValue
      };
      this.apiService.addUpdateResidenceDistance(payload).subscribe({
        next: (value) => {
          alert('Success')
        },
        error: (error) => {
          alert('Internal Server Error!')
        },
        complete: () => {
          this.getTableData();
        },
      })
    } else {
      alert('update Faield!')
    }

    //  validation requird for update table row

  }


  deleteDistance(element: DistanceDTO): void {
    if (confirm("Are you sure you want to delete this amentities?")) {
      this.apiService.deleteResidenceDistanceById(element.distanceId!)
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
            alert('Room Deleted successfully');
          },
          error: (error) => {
            alert('Room Not Found!');
          },
          complete: () => {
            this.getTableData();
          },
        })
      this.showDeleteConfirmation = false;
    } else {
      this.showDeleteConfirmation = false;
    }
  }


}

