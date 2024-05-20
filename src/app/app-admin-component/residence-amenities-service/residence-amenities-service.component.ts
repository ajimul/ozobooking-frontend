import { ChangeDetectorRef, Component, HostListener, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../../api-service/api-service.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CustomValidationService } from '../../app-validator/custom-validation-service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ResidenceAmenities, Residence } from '../../app-interface/Residence';
import { CustomValidation } from '../../app-validator/custom-validation';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ResidenceAmenitiesDTO } from '../../app-interface/ResidenceAmenitiesDTO';

@Component({
  selector: 'app-residence-amenities-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, FormsModule,MatDialogModule],
  templateUrl: './residence-amenities-service.component.html',
  styleUrl: './residence-amenities-service.component.css'
})
export class ResidenceAmenitiesServiceComponent {
  amenities: ResidenceAmenitiesDTO[] = []
  showDeleteConfirmation = false;
  amenitiesForm!: FormGroup
  dataSource = new MatTableDataSource<ResidenceAmenitiesDTO>(this.amenities);
  tableColumns = [
    'resiAmenGroupName',
    'resiAmenDetails',
    'action',
  ];
  constructor(
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: Residence,
    private validationService: CustomValidationService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ResidenceAmenitiesServiceComponent>,
    private cdr: ChangeDetectorRef
  ) { }
  resiAmenGroupName: any = "";
  createSubmitForm() {
    this.amenitiesForm = this.fb.group({
      resiAmen_refId: new FormControl(this.data.residenceId, [Validators.required, CustomValidation.idValidation(1)]),
      resiAmenGroupName: new FormControl(this.resiAmenGroupName, [Validators.required, CustomValidation.textValidation(1, 100)]),
      resiAmenDetails: new FormControl('', [Validators.required, CustomValidation.textValidation(1, 100)]),

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

    this.apiService.getResidencesById(this.data.residenceId).subscribe({
      next: (value) => {
        this.amenities = [];
        const newData: any = []
        this.amenitiesGroupList = [];
        value.residenceAmenities.forEach(a => {
          this.amenitiesGroupList.push({
            group: a.resiAmenGroupName
          })
          a.reseAmenitiesDetails.forEach(ad => {
            newData.push({
              resiAmenId: a.resiAmenId,
              resiAmen_refId: a.resiAmen_refId,
              resiAmenGroupName: a.resiAmenGroupName,
              resiAmenDetailId: ad.resiAmenDetailId,
              resiAmenDetail_refId: ad.resiAmenDetail_refId,
              resiAmenDetails: ad.resiAmenDetails,
            });
          })
        })
        this.dataSource.data = [];
        this.amenities = newData
      },
      error: (error) => {
        console.log(JSON.stringify(error))
        alert('Error')
      },
      complete: () => {
        this.dataSource = new MatTableDataSource<ResidenceAmenitiesDTO>(this.amenities);
      }
    });
  }
  setAmenitiesTableData(): void {
    // Clear the array before populating it with new data
    this.amenities = [];
    const newData: any = []
      this.amenitiesGroupList = [];
      this.data.residenceAmenities.forEach(residenceAmenities => {
        this.amenitiesGroupList.push({
          group: residenceAmenities.resiAmenGroupName
        })
        residenceAmenities.reseAmenitiesDetails.forEach(reseAmenitiesDetails => {
          newData.push({
            resiAmenId: residenceAmenities.resiAmenId,
            resiAmen_refId: this.data.residenceId,
            resiAmenGroupName: residenceAmenities.resiAmenGroupName,
            resiAmenDetailId: reseAmenitiesDetails.resiAmenDetailId,
            resiAmenDetail_refId: residenceAmenities.resiAmenId,
            resiAmenDetails: reseAmenitiesDetails.resiAmenDetails,
          });
        });
      });
    this.dataSource.data = [];
    this.amenities = newData
    this.dataSource = new MatTableDataSource<ResidenceAmenitiesDTO>(this.amenities);

  }


  ngOnInit(): void {
    this.setAmenitiesTableData();
    this.createSubmitForm();
  }

  
 

  isAmenitiesGroup: boolean = false;
  selectionAmenitiesGroup(selectElement: any) {
    const selectedValue = selectElement.value;
    this.resiAmenGroupName = selectedValue;
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
      const payload: ResidenceAmenities = {
        resiAmen_refId: this.amenitiesForm.get('resiAmen_refId')?.value,
        resiAmenGroupName: this.amenitiesForm.get('resiAmenGroupName')?.value,
        reseAmenitiesDetails: [
          {
            resiAmenDetails: this.amenitiesForm.get('resiAmenDetails')?.value,
          }
        ]
      };
      this.apiService.addUpdateResidenceAmenities(payload).subscribe({
        next: (value) => {
          alert('Success')
        },
        error: (error) => {
          alert('Internal Server Error!')
        },
        complete: () => {
          this.amenitiesForm.patchValue({
            resiAmenGroupName: '',
            resiAmenDetails: ''});
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


  updateAmenities(element:ResidenceAmenitiesDTO): void {
    let amenitiesGroup: string = element.resiAmenGroupName
    let amenitiesGroupDetails: string = element.resiAmenDetails
    if (amenitiesGroup.trim().length > 0
      && amenitiesGroupDetails.trim().length > 0) {
      const payload: ResidenceAmenities = {
        resiAmenId: element.resiAmenId,
        resiAmen_refId: element.resiAmen_refId,
        resiAmenGroupName: element.resiAmenGroupName,
        reseAmenitiesDetails: [
          {
            resiAmenDetailId: element.resiAmenDetailId,
            resiAmenDetail_refId: element.resiAmenDetail_refId,
            resiAmenDetails: element.resiAmenDetails,

          }
        ]
      };
      this.apiService.addUpdateResidenceAmenities(payload).subscribe({
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
  showConfirmDelete() {
    this.showDeleteConfirmation = true; // Show confirmation dialog
  }
  deleteAmenities(element:ResidenceAmenitiesDTO): void {
    if (confirm("Are you sure you want to delete this amenities?")) {
    this.apiService.deleteResidenceAmenitiesById(element.resiAmenDetailId!)
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
