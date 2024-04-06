import { ChangeDetectorRef, Component, HostListener, Inject, ViewChild } from '@angular/core';
import { ApiService } from '../../../../api-service/api-service.service';
import { CustomValidationService } from '../../../../app-validator/custom-validation-service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { ResidenceRooms,ResidenceRoomsPolicy } from '../../../../app-interface/Residence';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomValidation } from '../../../../app-validator/custom-validation';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { RoomPolicyDTO } from '../../../../app-interface/RoomPolicyDTO';

@Component({
  selector: 'app-app-room-policy-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, FormsModule],
  templateUrl: './app-room-policy-service.component.html',
  styleUrl: './app-room-policy-service.component.css'
})
export class AppRoomPolicyServiceComponent {
  apiServerUrl = environment.apiBaseUrl;
  residenceRoomsPolicy: ResidenceRoomsPolicy[] = [];
  moomPolicyDTO: RoomPolicyDTO[] = [];
  dataSource = new MatTableDataSource<RoomPolicyDTO>(this.moomPolicyDTO);
  roomPolicyForm!: FormGroup;
  roomPolicyTableColumns = [
    'roomPolicyName',
    'roomPolicyDescription',
    'action'
  ];
  roomPolicyName: any = "";

  constructor(
    private apiService: ApiService,
    private validationService: CustomValidationService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ResidenceRooms,
    private dialogRef: MatDialogRef<AppRoomPolicyServiceComponent>,
    private cdr: ChangeDetectorRef) {
    this.setMatTableDatasource();

  }

  setMatTableDatasource() {
    let roomPolicies = Array.from(this.data.roomPolicies);
    this.moomPolicyDTO = [];
    roomPolicies.forEach(policys => {
      policys.roomsPolicyDetails.forEach(policysDetails => {
        this.moomPolicyDTO.push({
          roomPolicyId: policys.roomPolicyId,
          roomPolicyRoom_refId: policys.roomPolicyRoom_refId,
          roomPolicyName: policys.roomPolicyName,
          roomPolicyDetailsId: policysDetails.roomPolicyDetailsId,
          roomPolicyDetails_refId: policysDetails.roomPolicyDetails_refId,
          roomPolicyDescription: policysDetails.roomPolicyDescription
        })
      });
    });
    this.dataSource = new MatTableDataSource<RoomPolicyDTO>(this.moomPolicyDTO);
  }

  roomPoliciesList: { policy: string }[] = [];
  getRoomPolicys() {
    this.apiService.getRoomPolicyByRoomId(this.data.roomId).subscribe({
      next: (value) => {
        let roomPolicies = Array.from(value);
        this.moomPolicyDTO = [];
        this.roomPoliciesList = []

        roomPolicies.forEach(policys => {
          this.roomPoliciesList.push({
            policy: policys.roomPolicyName
          })

          policys.roomsPolicyDetails.forEach(policysDetails => {
            this.moomPolicyDTO.push({
              roomPolicyId: policys.roomPolicyId,
              roomPolicyRoom_refId: policys.roomPolicyRoom_refId,
              roomPolicyName: policys.roomPolicyName,
              roomPolicyDetailsId: policysDetails.roomPolicyDetailsId,
              roomPolicyDetails_refId: policysDetails.roomPolicyDetails_refId,
              roomPolicyDescription: policysDetails.roomPolicyDescription
            })
          });
        });
         },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.dataSource = new MatTableDataSource<RoomPolicyDTO>(this.moomPolicyDTO);
      },
    })
  }
  setFormField() {
    this.roomPolicyForm = this.fb.group({
      roomPolicyRoom_refId: new FormControl(this.data.roomId, [Validators.required,
      CustomValidation.idValidation(1),]),

      roomPolicyName: new FormControl("", [
        Validators.required, CustomValidation.textValidation(1, 100)]),

      roomPolicyDescription: new FormControl("", [
        Validators.required, CustomValidation.textValidation(1, 100)
      ])
    })
  }
  ngOnInit(): void {
    this.setFormField();
  }
  // Validation
  getIdError(controlName: string): string | null {
    const control = this.roomPolicyForm.get(controlName);
    return control
      ? this.validationService.getIdValidationError(control) : null;
  }
  getTextError(controlName: string): string | null {
    const control = this.roomPolicyForm.get(controlName);
    return control
      ? this.validationService.getTextValidationError(control, '*', '*', '*', '*', '*', '*') : null;
  }

// Custom Policy Group Selection

  @ViewChild('policyGroupInput') policyGroupInput: any;
  isRoomPolicyName: boolean = false;
  selectionPolicyGroup(selectElement: any) {
    const selectedValue = selectElement.value;
    this.policyGroupInput = selectedValue;
    this.isRoomPolicyName = false;
    this.cdr.detectChanges();
  }
  togglePolicyGroup(visible: boolean) {
    this.isRoomPolicyName = visible;
  }
  togglePolicyGroupOnClick() {
    this.isRoomPolicyName = true;
  }
  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const childElement1 = document.getElementById('child-PolicyGroup');
    if (childElement1 && !this.isDescendant(childElement1, target)) {
      this.isRoomPolicyName = false;
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


  addPolicy() {
    // Check if the form is valid
    if (this.roomPolicyForm.invalid) {
      this.roomPolicyForm.markAllAsTouched();
      return;
    }
    let payload: ResidenceRoomsPolicy;
    payload = {
      roomPolicyRoom_refId: this.data.roomId,
      roomPolicyName: this.roomPolicyForm.get('roomPolicyName')?.value,
      roomsPolicyDetails: [{
        roomPolicyDescription: this.roomPolicyForm.get('roomPolicyDescription')?.value
      }]
    }

    this.apiService.addUpdateResidenceRoomPolicy(payload).subscribe({
      next: (response) => {
        alert('Policy Added Success');
      },
      error: (error) => {
        alert('Policy Added aborted!');
      },
      complete: () => {
        this.getRoomPolicys();
      }
    });
  }
  updatePolicy($event: any): void {
    let payload: ResidenceRoomsPolicy = ({
      roomPolicyId: $event.roomPolicyId,
      roomPolicyRoom_refId: $event.roomPolicyRoom_refId,
      roomPolicyName: $event.roomPolicyName,
      roomsPolicyDetails: [{
        roomPolicyDetailsId: $event.roomPolicyDetailsId,
        roomPolicyDetails_refId: $event.roomPolicyDetails_refId,
        roomPolicyDescription: $event.roomPolicyDescription
      }]

    })


    this.apiService.addUpdateResidenceRoomPolicy(payload).subscribe({
      next: (response) => {
        alert('Policy Added Success');
      },
      error: (error) => {
        alert('Policy Added aborted!');
      },
      complete: () => {
        this.getRoomPolicys();
      }
    });
  }
  deleteRoomPolicy(roomPolicyId:number){
        this.apiService.deleteResidenceRoomsPolicyById(roomPolicyId,)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 204) {//204, it indicates a successful request so it never show any were use only for understandng purpose
            console.log('Policy Deleted successfully');
          } else if (error.status === 404) {
            console.error('Not found!');
          } else {
            console.error('An error occurred:', error);
          }
          throw error;
        })
      )
      .subscribe({
        next: (response) => {
         
        },
        error: (error) => {
         
        },
        complete: () => {
         
        },
      })
  }

  deleteAction(element: any) {
    this.apiService.deleteResidenceRoomsPolicyDetailsById(element.roomPolicyDetailsId)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 204) {//204, it indicates a successful request so it never show any were use only for understandng purpose
            console.log('Policy Deleted successfully');
          } else if (error.status === 404) {
            console.error('Not found!');
          } else {
            console.error('An error occurred:', error);
          }
          throw error;
        })
      )
      .subscribe({
        next: (response) => {
          this.deleteRoomPolicy(element.roomPolicyId);
          alert('Policy Deleted successfully');
          },
        error: (error) => {
          alert('Not Found!');
            
        },
        complete: () => {
          this.getRoomPolicys()
        },
      })
  }
  

 
}
