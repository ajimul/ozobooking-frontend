import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../../api-service/api-service.service';
import { ResidencceRoomAmentities, Residence, ResidenceRooms } from '../../../../app-interface/Residence';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomValidationService } from '../../../../app-validator/custom-validation-service';
import { RoomAmentitiesDTO } from '../../../../app-interface/RoomAmentitiesDTO';
import { CustomValidation } from '../../../../app-validator/custom-validation';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-app-room-amentities-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, FormsModule],
  templateUrl: './app-room-amentities-service.component.html',
  styleUrl: './app-room-amentities-service.component.css'
})
export class AppRoomAmentitiesServiceComponent {
  amentities: RoomAmentitiesDTO[] = []
  amentitiesForm!: FormGroup
  dataSource = new MatTableDataSource<RoomAmentitiesDTO>(this.amentities);
  tableColumns = [
    'roomAmenGroupName',
    'roomAmenType',
    'roomAmenDetails',
    'action',
  ];
  constructor(
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: ResidenceRooms[],
    private validationService: CustomValidationService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AppRoomAmentitiesServiceComponent>,
    private cdr: ChangeDetectorRef
  ) { }
  roomAmenGroupName: any = "";

  createSubmitForm() {
    this.amentitiesForm = this.fb.group({
      roomAmen_refId: new FormControl(Array.from(this.data)[0].roomId, [Validators.required, CustomValidation.idValidation(1)]),
      roomAmenType: new FormControl('', [Validators.required, CustomValidation.textValidation(1, 100)]),
      roomAmenGroupName: new FormControl(this.roomAmenGroupName, [Validators.required, CustomValidation.textValidation(1, 100)]),
      roomAmenDetails: new FormControl('', [Validators.required, CustomValidation.textValidation(1, 100)]),

    })
  }
  getIdError(controlName: string): string | null {
    const control = this.amentitiesForm.get(controlName);
    return control
      ? this.validationService.getIdValidationError(control) : null;
  }
  getTextError(controlName: string): string | null {
    const control = this.amentitiesForm.get(controlName);
    return control
      ? this.validationService.getTextValidationError(control, '*', '*', '*', '*', '*', '*') : null;
  }

  amentitiesTypeList: { type: string }[] = [];
  amentitiesGroupList: { group: string }[] = [];
  getTableData(): void {
    this.apiService.getResidencesById(Array.from(this.data)[0].roomResidence_refId).subscribe({
      next: (value) => {
        this.amentities = [];
        const newData: any = []
        this.amentitiesTypeList = [];
        this.amentitiesGroupList = [];
        value.residenceRooms.forEach(room => {
          room.roomAmentities.forEach(a => {
            this.amentitiesGroupList.push({
              group: a.roomAmenGroupName
            })
            this.amentitiesTypeList.push({
              type: a.roomAmenType
            })
            a.roomAmentitiesDetails.forEach(ad => {
              newData.push({
                roomAmenId: a.roomAmenId,
                roomAmen_refId: a.roomAmen_refId,
                roomAmenType: a.roomAmenType,
                roomAmenGroupName: a.roomAmenGroupName,
                roomAmenDetailId: ad.roomAmenDetailId,
                roomAmenDetail_refId: ad.roomAmenDetail_refId,
                roomAmenDetails: ad.roomAmenDetails,
              });
            });
          });
        });
        this.dataSource.data = [];
        this.amentities = newData
      },
      error: (error) => {
        console.log(JSON.stringify(error))
        alert('Error')
      },
      complete: () => {
        this.dataSource = new MatTableDataSource<RoomAmentitiesDTO>(this.amentities);
      }
    });
  }
  setAmentitiesTableData(): void {
    // Clear the array before populating it with new data
    this.amentities = [];
    const newData: any = []
    this.data.forEach(residence => {
      // residence.residenceRooms.forEach(room => {
      residence.roomAmentities.forEach(a => {
        this.amentitiesGroupList.push({
          group: a.roomAmenGroupName
        })
        this.amentitiesTypeList.push({
          type: a.roomAmenType
        })
        a.roomAmentitiesDetails.forEach(ad => {
          newData.push({
            roomAmenId: a.roomAmenId,
            roomAmen_refId: a.roomAmen_refId,
            roomAmenType: a.roomAmenType,
            roomAmenGroupName: a.roomAmenGroupName,
            roomAmenDetailId: ad.roomAmenDetailId,
            roomAmenDetail_refId: ad.roomAmenDetail_refId,
            roomAmenDetails: ad.roomAmenDetails,
          });
        });
      });
      // });
    });
    this.dataSource.data = [];
    this.amentities = newData
    this.dataSource = new MatTableDataSource<RoomAmentitiesDTO>(this.amentities);

  }

  ngOnInit(): void {
    this.setAmentitiesTableData();
    this.createSubmitForm();
  }




  @ViewChild('amentitiesGroupInput') amentitiesGroupInput: any;
  isAmentitiesGroup: boolean = false;
  selectionAmentitiesGroup(selectElement: any) {
    const selectedValue = selectElement.value;
    this.roomAmenGroupName = selectedValue;
    this.isAmentitiesGroup = false;
    this.cdr.detectChanges();
  }
  toggleAmentitiesGroup(visible: boolean) {
    this.isAmentitiesGroup = visible;
  }
  toggleAmentitiesGroupOnClick() {
    this.isAmentitiesGroup = true;
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const childElement1 = document.getElementById('child-AmentitiesGroup');
    if (childElement1 && !this.isDescendant(childElement1, target)) {
      this.isAmentitiesGroup = false;
    }
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
    this.markFormGroupTouched(this.amentitiesForm);
    if (this.amentitiesForm.valid) {
      const payload: ResidencceRoomAmentities = {
        roomAmen_refId: this.amentitiesForm.get('roomAmen_refId')?.value,
        roomAmenGroupName: this.amentitiesForm.get('roomAmenGroupName')?.value,
        roomAmenType: this.amentitiesForm.get('roomAmenType')?.value,
        roomAmentitiesDetails: [
          {
            roomAmenDetails: this.amentitiesForm.get('roomAmenDetails')?.value,
          }
        ]
      };

      this.apiService.addUpdateResidenceRoomAmentities(payload).subscribe({
        next: (value) => {
          alert('Success')
        },
        error: (error) => {
          alert('Internal Server Error!')
        },
        complete: () => {
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

  updateAmentities($event: any): void {

    let amentitiesGroup: string = $event.roomAmenGroupName
    let amentitiesGroupDetails: string = $event.roomAmenDetails
    if (amentitiesGroup.trim().length > 0
      && amentitiesGroupDetails.trim().length > 0) {
      const payload: ResidencceRoomAmentities = {
        roomAmenId: $event.roomAmenId,
        roomAmen_refId: $event.roomAmen_refId,
        roomAmenGroupName: $event.roomAmenGroupName,
        roomAmenType: $event.roomAmenType,
        roomAmentitiesDetails: [
          {
            roomAmenDetailId: $event.roomAmenDetailId,
            roomAmenDetail_refId: $event.roomAmenDetail_refId,
            roomAmenDetails: $event.roomAmenDetails,
          }
        ]
      };
      this.apiService.addUpdateResidenceRoomAmentities(payload).subscribe({
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
      alert('Empty Data Not Allowed!')
    }

  }
  deleteAmentities($event: number): void {
    this.apiService.deleteResidenceRoomAmentitiesById($event)
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
          alert('Amentities Deleted successfully');
        },
        error: (error) => {
          alert('Amentities Not Found!');
        },
        complete: () => {
          this.getTableData();
        },
      })
  }
}
