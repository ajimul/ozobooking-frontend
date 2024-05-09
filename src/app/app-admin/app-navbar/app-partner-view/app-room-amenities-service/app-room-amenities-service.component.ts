import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../../api-service/api-service.service';
import { ResidenceRoomAmenities, Residence, ResidenceRooms } from '../../../../app-interface/Residence';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CustomValidationService } from '../../../../app-validator/custom-validation-service';
import { RoomAmenitiesDTO } from '../../../../app-interface/RoomAmenitiesDTO';
import { CustomValidation } from '../../../../app-validator/custom-validation';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-app-room-amenities-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, FormsModule,MatDialogModule],
  templateUrl: './app-room-amenities-service.component.html',
  styleUrl: './app-room-amenities-service.component.css'
})
export class AppRoomAmenitiesServiceComponent {
  amenities: RoomAmenitiesDTO[] = []
  amenitiesForm!: FormGroup
  dataSource = new MatTableDataSource<RoomAmenitiesDTO>(this.amenities);
  showDeleteConfirmation = false;
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
    private dialogRef: MatDialogRef<AppRoomAmenitiesServiceComponent>,
    private cdr: ChangeDetectorRef
  ) { }
  roomAmenGroupName: any = "";

  createSubmitForm() {
    this.amenitiesForm = this.fb.group({
      roomAmen_refId: new FormControl(Array.from(this.data)[0].roomId, [Validators.required, CustomValidation.idValidation(1)]),
      roomAmenType: new FormControl('', [Validators.required, CustomValidation.textValidation(1, 100)]),
      roomAmenGroupName: new FormControl(this.roomAmenGroupName, [Validators.required, CustomValidation.textValidation(1, 100)]),
      roomAmenDetails: new FormControl('', [Validators.required, CustomValidation.textValidation(1, 100)]),

    })
  }
  getIdError(controlName: string): string | null {
    const control = this.amenitiesForm.get(controlName);
    return control
      ? this.validationService.getIdValidationError(control) : null;
  }
  getTextError(controlName: string): string | null {
    const control = this.amenitiesForm.get(controlName);
    return control
      ? this.validationService.getTextValidationError(control, '*', '*', '*', '*', '*', '*') : null;
  }


  amenitiesGroupList: { group: string }[] = [];
  getTableData(): void {
    this.apiService.getResidencesById(Array.from(this.data)[0].roomResidence_refId!).subscribe({
      next: (value) => {
        this.amenities = [];
        const newData: any = []
    
        this.amenitiesGroupList = [];
        value.residenceRooms.forEach(room => {
          room.roomsAmenities!.forEach(a => {
            this.amenitiesGroupList.push({
              group: a.roomAmenGroupName
            })
       
            a.roomAmenitiesDetails.forEach(ad => {
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
        this.amenities = newData
      },
      error: (error) => {
        console.log(JSON.stringify(error))
        alert('Error')
      },
      complete: () => {
        this.dataSource = new MatTableDataSource<RoomAmenitiesDTO>(this.amenities);
      }
    });
  }
  setAmenitiesTableData(): void {
    // Clear the array before populating it with new data
    this.amenities = [];
    const newData: any = []
    this.data.forEach(residence => {
      residence.roomsAmenities!.forEach(a => {
        this.amenitiesGroupList.push({
          group: a.roomAmenGroupName
        })
        a.roomAmenitiesDetails.forEach(ad => {
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
    this.amenities = newData
    this.dataSource = new MatTableDataSource<RoomAmenitiesDTO>(this.amenities);

  }
  showConfirmDelete() {
    this.showDeleteConfirmation = true; // Show confirmation dialog
  }

  ngOnInit(): void {
    this.setAmenitiesTableData();
    this.createSubmitForm();
  }




  @ViewChild('amenitiesGroupInput') amenitiesGroupInput: any;
  isAmenitiesGroup: boolean = false;
  selectionAmenitiesGroup(selectElement: any) {
    const selectedValue = selectElement.value;
    this.roomAmenGroupName = selectedValue;
    this.isAmenitiesGroup = false;
    this.cdr.detectChanges();
  }
  toggleAmenitiesGroup(visible: boolean) {
    this.isAmenitiesGroup = visible;
  }
  toggleAmenitiesGroupOnClick() {
    this.isAmenitiesGroup = true;
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const childElement1 = document.getElementById('child-AmenitiesGroup');
    if (childElement1 && !this.isDescendant(childElement1, target)) {
      this.isAmenitiesGroup = false;
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
    this.markFormGroupTouched(this.amenitiesForm);
    if (this.amenitiesForm.valid) {
      const payload: ResidenceRoomAmenities = {
        roomAmen_refId: this.amenitiesForm.get('roomAmen_refId')?.value,
        roomAmenGroupName: this.amenitiesForm.get('roomAmenGroupName')?.value,
        roomAmenType: this.amenitiesForm.get('roomAmenType')?.value,
        roomAmenitiesDetails: [
          {
            roomAmenDetails: this.amenitiesForm.get('roomAmenDetails')?.value,
          }
        ]
      };

      this.apiService.addUpdateResidenceRoomAmenities(payload).subscribe({
        next: (value) => {
          alert('Success')
        },
        error: (error) => {
          alert('Internal Server Error!')
        },
        complete: () => {
          this.amenitiesForm .patchValue({
            roomAmenType: '',
            roomAmenGroupName:'',
            roomAmenDetails: ''})      
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

  updateAmenities($event: any): void {    
    let amenitiesGroup: string = $event.roomAmenGroupName
    let amenitiesGroupDetails: string = $event.roomAmenDetails
    if (amenitiesGroup.trim().length > 0
      && amenitiesGroupDetails.trim().length > 0) {
      const payload: ResidenceRoomAmenities = {
        roomAmenId: $event.roomAmenId,
        roomAmen_refId: $event.roomAmen_refId,
        roomAmenGroupName: $event.roomAmenGroupName,
        roomAmenType: $event.roomAmenType,
        roomAmenitiesDetails: [
          {
            roomAmenDetailId: $event.roomAmenDetailId,
            roomAmenDetail_refId: $event.roomAmenDetail_refId,
            roomAmenDetails: $event.roomAmenDetails,
          }
        ]
      };
      this.apiService.addUpdateResidenceRoomAmenities(payload).subscribe({
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
  deleteAmenities($event: number): void {
    if (confirm("Are you sure you want to delete this amenities?")) {
    this.apiService.deleteResidenceRoomAmenitiesById($event)
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
          alert('Amenities Deleted successfully');
        },
        error: (error) => {
          alert('Amenities Not Found!');
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
