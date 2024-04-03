import { ChangeDetectorRef, Component, HostListener, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../../../../api-service/api-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomValidationService } from '../../../../app-validator/custom-validation-service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ResidencceAmentities, Residence } from '../../../../app-interface/Residence';
import { ResidencceAmentitiesDTO } from '../../../../app-interface/ResidencceAmentitiesDTO';
import { CustomValidation } from '../../../../app-validator/custom-validation';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-app-residence-amentities-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, FormsModule],
  templateUrl: './app-residence-amentities-service.component.html',
  styleUrl: './app-residence-amentities-service.component.css'
})
export class AppResidenceAmentitiesServiceComponent {


  amentities: ResidencceAmentitiesDTO[] = []
  amentitiesForm!: FormGroup
  dataSource = new MatTableDataSource<ResidencceAmentitiesDTO>(this.amentities);
  // tableRow = new Set<ResidencceAmentitiesDTO>();
  tableColumns = [
    'resiAmenGroupName',
    'resiAmenDetails',
    'action',
  ];
  constructor(
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: Residence[],
    private validationService: CustomValidationService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AppResidenceAmentitiesServiceComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  setTableData(): void {

  }
  createSubmitForm() {
    this.amentitiesForm = this.fb.group({
      resiAmen_refId: new FormControl(Array.from(this.data)[0].residenceId, [Validators.required, CustomValidation.idValidation(1)]),
      resiAmenGroupName: new FormControl(this.resiAmenGroupName, [Validators.required, CustomValidation.textValidation(1, 100)]),
      resiAmenDetails: new FormControl('', [Validators.required, CustomValidation.textValidation(1, 100)]),

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

  getTableData(): void {

    this.apiService.getResidencesById(Array.from(this.data)[0].residenceId).subscribe({
      next: (value) => {
        this.amentities = [];
        const newData: any = []
        this.amentitiesGroupList = [];
        value.residencceAmentities.forEach(a => {
          this.amentitiesGroupList.push({
            group: a.resiAmenGroupName
          })
          a.reseAmentitiesDetails.forEach(ad => {
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
        this.amentities = newData
      },
      error: (error) => {
        console.log(JSON.stringify(error))
        alert('Error')
      },
      complete: () => {
        this.dataSource = new MatTableDataSource<ResidencceAmentitiesDTO>(this.amentities);
      }
    });
  }


  setAmentitiesTableData(): void {
    // Clear the array before populating it with new data
    this.amentities = [];
    const newData: any = []

    // Populate the amentities array with new data
    this.data.forEach(residence => {
      this.amentitiesGroupList = [];
      residence.residencceAmentities.forEach(residencceAmentities => {
        this.amentitiesGroupList.push({
          group: residencceAmentities.resiAmenGroupName
        })
        residencceAmentities.reseAmentitiesDetails.forEach(reseAmentitiesDetails => {
          newData.push({
            resiAmenId: residencceAmentities.resiAmenId,
            resiAmen_refId: residence.residenceId,
            resiAmenGroupName: residencceAmentities.resiAmenGroupName,
            resiAmenDetailId: reseAmentitiesDetails.resiAmenDetailId,
            resiAmenDetail_refId: residencceAmentities.resiAmenId,
            resiAmenDetails: reseAmentitiesDetails.resiAmenDetails,
          });
        });
      });
    });

    // Reset the MatTableDataSource with the updated data
    // console.log(this.data)
    this.dataSource.data = [];
    this.amentities = newData
    // console.log(this.data)
    this.dataSource = new MatTableDataSource<ResidencceAmentitiesDTO>(this.amentities);
    // console.log(this.data)

  }


  ngOnInit(): void {
    this.setAmentitiesTableData();
    this.createSubmitForm();
  }

  resiAmenGroupName: any = "";
  amentitiesGroupList: { group: string }[] = [];

  @ViewChild('amentitiesGroupInput') amentitiesGroupInput: any;
  isAmentitiesGroup: boolean = false;
  selectionAmentitiesGroup(selectElement: any) {
    const selectedValue = selectElement.value;
    this.resiAmenGroupName = selectedValue;
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
      const payload: ResidencceAmentities = {
        resiAmen_refId: this.amentitiesForm.get('resiAmen_refId')?.value,
        resiAmenGroupName: this.amentitiesForm.get('resiAmenGroupName')?.value,
        reseAmentitiesDetails: [
          {
            resiAmenDetails: this.amentitiesForm.get('resiAmenDetails')?.value,
          }
        ]
      };
      this.apiService.addUpdateResidenceAmentities(payload).subscribe({
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

  isInputValid: boolean = true;


  updateAmentities($event: any): void {
    let amentitiesGroup: string = $event.resiAmenGroupName
    let amentitiesGroupDetails: string = $event.resiAmenDetails
    if (amentitiesGroup.trim().length > 0
      && amentitiesGroupDetails.trim().length > 0) {
      const payload: ResidencceAmentities = {
        resiAmenId: $event.resiAmenId,
        resiAmen_refId: $event.resiAmen_refId,
        resiAmenGroupName: $event.resiAmenGroupName,
        reseAmentitiesDetails: [
          {
            resiAmenDetailId: $event.resiAmenDetailId,
            resiAmenDetail_refId: $event.resiAmenDetail_refId,
            resiAmenDetails: $event.resiAmenDetails,

          }
        ]
      };
      this.apiService.addUpdateResidenceAmentities(payload).subscribe({
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
    this.apiService.deleteResidenceAmentitiesById($event)
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
