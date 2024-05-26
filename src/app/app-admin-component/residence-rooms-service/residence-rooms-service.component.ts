import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../api-service/api-service.service';
import { CustomValidationService } from '../../app-validator/custom-validation-service';
import { ResidenceRoomsDTO } from '../../app-interfaces/ResidenceRoomsDTO';
import { CustomValidation } from '../../app-validator/custom-validation';
import { Residence, ResidenceRooms } from '../../app-interfaces/Residence';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-residence-rooms-service',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatTableModule, FormsModule, MatDialogModule],
  templateUrl: './residence-rooms-service.component.html',
  styleUrl: './residence-rooms-service.component.css'
})
export class ResidenceRoomsServiceComponent {

  roomType: any;
  roomAvailability: any;
  roomBedType: any;
  roomPrice: any;
  roomTradingPrice: any;
  roomDiscount: any;
  roomDescription: any;
  showDeleteConfirmation = false;
  residenceRoom: ResidenceRoomsDTO[] = []
  residenceRoomForm!: FormGroup
  dataSource = new MatTableDataSource<ResidenceRoomsDTO>(this.residenceRoom);
  tableColumns = [
    'roomType',
    'roomAvailability',
    'roomBedType',
    'roomPrice',
    'roomTradingPrice',
    'roomDiscount',
    'roomDescription',
    'roomIssueDate',
    'action',
  ];
  constructor(
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: Residence,
    private validationService: CustomValidationService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ResidenceRoomsServiceComponent>,
    private cdr: ChangeDetectorRef
  ) {

  }
  resiAmenGroupName: any = "";
  createSubmitForm() {

    this.residenceRoomForm = this.fb.group({
      roomResidence_refId: new FormControl(this.data.residenceId, [Validators.required, CustomValidation.idValidation(1)]),
      roomType: new FormControl('', [Validators.required, CustomValidation.textValidation(1, 100)]),
      roomAvailability: new FormControl('', [Validators.required, CustomValidation.textValidation(1, 100)]),
      roomBedType: new FormControl('', [Validators.required, CustomValidation.textValidation(1, 100)]),

      roomPrice: new FormControl('', [Validators.required, CustomValidation.numberValidation(1)]),
      roomTradingPrice: new FormControl('', [Validators.required, CustomValidation.numberValidation(1)]),
      roomDiscount: new FormControl('', [Validators.required, CustomValidation.numberValidation(1)]),

      roomDescription: new FormControl('', [Validators.required, CustomValidation.textValidation(1, 100)]),
      roomIssueDate: new FormControl('', [Validators.required, CustomValidation.dateValidation()]),

    })
  }
  getIdError(controlName: string): string | null {
    const control = this.residenceRoomForm.get(controlName);
    return control
      ? this.validationService.getIdValidationError(control) : null;
  }
  getNumberError(controlName: string): string | null {
    const control = this.residenceRoomForm.get(controlName);
    return control
      ? this.validationService.getNumberValidationError(control) : null;
  }
  getTextError(controlName: string): string | null {
    const control = this.residenceRoomForm.get(controlName);
    return control
      ? this.validationService.getTextValidationError(control, '*', '*', '*', '*', '*', '*') : null;
  }
  getDateError(controlName: string): string | null {
    const control = this.residenceRoomForm.get(controlName);
    return control
      ? this.validationService.getDateValidationError(control, '*', '*') : null;
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

  nonControl_textValidation(getfieldValue: any, element: ResidenceRoomsDTO) {
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
  nonControl_IdValidationError(getfieldValue: any, element: ResidenceRoomsDTO) {
    const fieldValue = getfieldValue;
    const min_number_length = 1;
    if (fieldValue === null || fieldValue === undefined || fieldValue === '') {
      element.errorMessage = 'ID is required';
      return;
    }
    if (isNaN(fieldValue)) {
      element.errorMessage = 'ID must be a number';
      return;
    }

    if (fieldValue.toString().length < min_number_length) {
      element.errorMessage = `ID must be at least ${min_number_length} characters long`;
      return;

    }
    if (fieldValue <= 0) {
      element.errorMessage = 'ID must be a positive number';
      return;
    }
    if (!/^\d+$/.test(fieldValue.toString())) {
      element.errorMessage = 'ID must be an integer';
      return;
    }
  }
  nonControl_NumberValidation(getfieldValue: any, element: ResidenceRoomsDTO) {
    const fieldValue = getfieldValue;
    const min_number_length = 1; // You can adjust this according to your requirement
    if (fieldValue === null || fieldValue === undefined || fieldValue === '') {
      element.errorMessage = '*';
      return;
    }
    if (isNaN(Number(fieldValue))) {
      element.errorMessage = '*';
      return;
    }
    if (fieldValue.length < min_number_length) {
      element.errorMessage = `*`;
      return;
    }
    if (Number(fieldValue) <= 0) {
      element.errorMessage = '*';
      return;
    }
    if (!/^\d+$/.test(fieldValue)) {
      element.errorMessage = '*';
      return;
    }
    // If no validation error, clear errorMessage
    element.errorMessage = '';
  }


  roomTypeList: { type: string }[] = [];
  roomBedTypeList: { type: string }[] = [];
  getTableData(): void {

    this.apiService.getResidencesById(this.data.residenceId).subscribe({
      next: (value) => {
        this.residenceRoom = [];
        let newData: ResidenceRoomsDTO[] = []
        this.roomTypeList = [];
        value.residenceRooms.forEach(rr => {
          this.roomTypeList.push({
            type: rr.roomType
          })
          this.roomBedTypeList.push({
            type: rr.roomBedType
          })
          newData.push({
            roomId: rr.roomId,
            roomResidence_refId: rr.roomResidence_refId,
            roomType: rr.roomType,
            roomAvailability: rr.roomAvailability,
            roomBedType: rr.roomBedType,
            roomPrice: rr.roomPrice,
            roomTradingPrice: rr.roomTradingPrice,
            roomDiscount: rr.roomDiscount,
            roomDescription: rr.roomDescription,
            roomIssueDate: rr.roomIssueDate,
            errorMessage: '',

          });

        })
        this.dataSource.data = [];
        this.residenceRoom = newData
      },
      error: (error) => {
        console.log(JSON.stringify(error))
        alert('Error')
      },
      complete: () => {
        this.dataSource = new MatTableDataSource<ResidenceRoomsDTO>(this.residenceRoom);
      }
    });
  }
  setRoomTableData(): void {
    // Clear the array before populating it with new data
    this.residenceRoom = [];
    let newData: ResidenceRoomsDTO[] = []
    this.roomTypeList = [];
    this.roomBedTypeList = [];
    this.data.residenceRooms.forEach(rr => {
      this.roomTypeList.push({
        type: rr.roomType
      })
      this.roomBedTypeList.push({
        type: rr.roomBedType
      })

      newData.push({
        roomId: rr.roomId,
        roomResidence_refId: rr.roomResidence_refId,
        roomType: rr.roomType,
        roomAvailability: rr.roomAvailability,
        roomBedType: rr.roomBedType,
        roomPrice: rr.roomPrice,
        roomTradingPrice: rr.roomTradingPrice,
        roomDiscount: rr.roomDiscount,
        roomDescription: rr.roomDescription,
        roomIssueDate: rr.roomIssueDate,
        errorMessage: '',
      });

    });
    // });
    this.dataSource.data = [];
    this.residenceRoom = newData
    this.dataSource = new MatTableDataSource<ResidenceRoomsDTO>(this.residenceRoom);

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
    this.markFormGroupTouched(this.residenceRoomForm);
    if (this.residenceRoomForm.valid) {
      const payload: ResidenceRooms = {
        roomResidence_refId: this.residenceRoomForm.get('roomResidence_refId')?.value,
        roomType: this.residenceRoomForm.get('roomType')?.value,
        roomAvailability: this.residenceRoomForm.get('roomAvailability')?.value,
        roomBedType: this.residenceRoomForm.get('roomBedType')?.value,
        roomPrice: this.residenceRoomForm.get('roomPrice')?.value,
        roomTradingPrice: this.residenceRoomForm.get('roomTradingPrice')?.value,
        roomDiscount: this.residenceRoomForm.get('roomDiscount')?.value,
        roomDescription: this.residenceRoomForm.get('roomDescription')?.value,
        roomIssueDate: this.residenceRoomForm.get('roomIssueDate')?.value,

      };
      this.apiService.addUpdateResidenceRoom(payload).subscribe({
        next: (value) => {
          alert('Success')
        },
        error: (error) => {
          alert('Internal Server Error!')
        },
        complete: () => {
          this.residenceRoomForm.patchValue({
            roomType: '',
            roomAvailability: '',
            roomBedType: '',
            roomPrice: '',
            roomTradingPrice: '',
            roomDiscount: '',
            roomDescription: '',
            roomIssueDate: ''
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


  updateRoom(element: ResidenceRoomsDTO): void {
    console.log(element)
    if (element.errorMessage === '') {
      const payload: ResidenceRooms = {
        roomId: element.roomId,
        roomResidence_refId: element.roomResidence_refId,
        roomType: element.roomType,
        roomAvailability: element.roomAvailability,
        roomBedType: element.roomBedType,
        roomPrice: element.roomPrice,
        roomTradingPrice: element.roomTradingPrice,
        roomDiscount: element.roomDiscount,
        roomDescription: element.roomDescription,
        roomIssueDate: element.roomIssueDate
      };
      this.apiService.addUpdateResidenceRoom(payload).subscribe({
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


  deleteRoom(element: ResidenceRoomsDTO): void {
    if (confirm("Are you sure you want to delete this room?")) {
      this.apiService.deleteResidenceRoomById(element.roomId!)
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
