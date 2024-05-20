import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { ApiService } from '../../api-service/api-service.service';
import { Residence, ResidenceRoomAmenities, ResidenceRoomAmenitiesDetails, ResidenceRooms, ResidenceRoomsImages } from '../../app-interface/Residence';
import { PartnerSignupComponent } from '../partner-signup/partner-signup.component';
import { ResidenceUpdateComponent } from '../residence-update/residence-update.component';
import { ResidenceAgreementComponent } from '../residence-agreement/residence-agreement.component';
import { ResidenceImageServiceComponent } from '../residence-image-service/residence-image-service.component';
import { ResidenceAmenitiesServiceComponent } from '../residence-amenities-service/residence-amenities-service.component';
import { ResidenceLocationServiceComponent } from '../residence-location-service/residence-location-service.component';
import { ResidenceRoomsServiceComponent } from '../residence-rooms-service/residence-rooms-service.component';
import { RoomAmenitiesServiceComponent } from '../room-amenities-service/room-amenities-service.component';
import { RoomImagesServiceComponent } from '../room-images-service/room-images-service.component';
import { RoomPolicyServiceComponent } from '../room-policy-service/room-policy-service.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-residence-list-view',
  standalone: true,
  imports: [MatTableModule, CommonModule, FormsModule],
  providers: [{
    provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
      panelClass: ['mat-mdc-dialog-container', 'mdc-dialog__surface']
    }
  }],
  templateUrl: './residence-list-view.component.html',
  styleUrl: './residence-list-view.component.css'
})
export class ResidenceListViewComponent {
  showDeleteConfirmation = false;
  customDialogClass = 'custom-dialog-bgx';
  constructor(private dialog: MatDialog, private service: ApiService) { }
  ngOnInit(): void {
    this.getResidenceTableData();
  }
  onStatusChange(element: Residence): void {
    if (element.isActive) {
    }
  }
  onSelectedProperty(element: Residence): void {
    if (element.isActive) {
    }
  }
  //ResidenceList MatTable DataSource 
  residenceList: Residence[] = [];
  residenceListDataSource = new MatTableDataSource<Residence>(this.residenceList);
  residenceLisTableRow = new Set<Residence>();
  residenceListTableColumns = [
    'residenceName',
  ];
  getResidenceTableData(): void {
    this.residenceList = [];
    this.residenceListDataSource = new MatTableDataSource<Residence>(this.residenceList);
    this.residence = [];
    this.residenceDataSource = new MatTableDataSource<Residence>(this.residence);
    this.rooms = [];
    this.roomsDataSource = new MatTableDataSource<ResidenceRooms>(this.rooms);
    this.service.getResidences().subscribe({
      next: (data) => {
        this.residenceList = data;

      },
      error: (e) => console.error(e),
      complete: () => {
        this.residenceListDataSource = new MatTableDataSource<Residence>(this.residenceList);
      },
    });
  }
  applyResidenceListFilter($event: any) {
    this.residenceListDataSource.filter = $event.target.value;
  }
  getResidenceListTableRow(row: any) {
    this.residenceLisTableRow.clear();
    this.residenceLisTableRow.add(row);
    // set data on Residence table
    this.residence = Array.from(this.residenceLisTableRow);
    this.residenceDataSource = new MatTableDataSource<Residence>(this.residence);
    // set data on Rooms table
    this.rooms = [];
    this.roomsDataSource = new MatTableDataSource<ResidenceRooms>(this.rooms);
    this.residence.forEach(residence => {
      this.rooms = Array.from(residence.residenceRooms);
    });
    this.roomsDataSource = new MatTableDataSource<ResidenceRooms>(this.rooms);
  }


  //Residence MatTable DataSource 
  residence: Residence[] = [];
  residenceDataSource = new MatTableDataSource<Residence>(this.residence);
  residenceTableColumns = [
    'residenceId',
    'residenceName',
    'residenceType',
    'residenceLocation',
    'isActive',
    'property',
    'action',
    'view',
  ];

  addPartner() {
    const config = new MatDialogConfig<any>();
    config.width = '40%';
    config.height = '90%';
    config.panelClass = ['custom-dialog-bg'];
    const dialogRef = this.dialog.open(PartnerSignupComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      this.getResidenceTableData();
    });
  }
  showConfirmDelete() {
    this.showDeleteConfirmation = true; // Show confirmation dialog
  }
  deletePartner($event: number): void {
    if (confirm("Are you sure you want to delete this Residence?")) {
      this.service.deleteResidence($event).subscribe({
        next: (response) => {
          alert(response.message);
          this.getResidenceTableData();
        },
        error: (error) => {
          let errorMessage = '';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          else if (error.message) {
            errorMessage = error.message;
          }
          console.log('Error Message: ', errorMessage);
          alert(errorMessage);
        }
      });
      this.showDeleteConfirmation = false;
    } else {
      this.showDeleteConfirmation = false;
    }

  }
  updatePartner(element: Residence) {
    const config = new MatDialogConfig<any>();
    config.width = '30%';
    config.height = '71.5%';
    config.data = element;
    const dialogRef = this.dialog.open(ResidenceUpdateComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      // this.getResidenceTableData();
    });
  }
  residenceAgreementService(residenceId: any) {
    const config = new MatDialogConfig<any>();
    config.width = '90%';
    config.height = '90%';
    config.data = { residenceId };
    const dialogRef = this.dialog.open(ResidenceAgreementComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      // this.getResidenceTableData();
    });
  }
  residenceImageService(residence: any) {
    const config = new MatDialogConfig<any>();
    config.width = '90%';
    config.height = '90%';
    config.data = { residence };
    const dialogRef = this.dialog.open(ResidenceImageServiceComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      // this.getResidenceTableData();
    });
  }
  residenceAmenitiesService(element: Residence) {
    const config = new MatDialogConfig<any>();
    config.width = '90%';
    config.height = '90%';
    config.data = element;
    const dialogRef = this.dialog.open(ResidenceAmenitiesServiceComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      this.clearSelection('residenceDialogRefSet');
      // this.getResidenceTableData();
    });
  }
  residenceLocationService(element: Residence) {
    const config = new MatDialogConfig<any>();
    config.width = '90%';
    config.height = '90%';
    config.data = element;
    const dialogRef = this.dialog.open(ResidenceLocationServiceComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      this.clearSelection('residenceDialogRefSet');
      // this.getResidenceTableData();
    });
  }
  residenceRoomService(element: Residence) {
    const config = new MatDialogConfig<any>();
    config.width = '90%';
    config.height = '90%';
    config.data = element;
    const dialogRef = this.dialog.open(ResidenceRoomsServiceComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      this.clearSelection('residenceDialogRefSet');
      // this.getResidenceTableData();
    });
  }

  onResidenceSelectionChange(residenceDialogRefSet: HTMLSelectElement, element: Residence): void {
    switch (residenceDialogRefSet.value) {
      case '1': this.residenceAgreementService(element.residenceId);
        break;
      case '2': this.residenceImageService(element);
        break;
      case '3': this.residenceAmenitiesService(element);
        break;
      case '4': this.residenceLocationService(element);
        break;
      case '5': this.residenceRoomService(element);
        break;
      default:
        // Handle other cases if needed
        break;
    }
  }

  //Rooms MatTable DataSource 
  rooms: ResidenceRooms[] = [];
  roomsDataSource = new MatTableDataSource<ResidenceRooms>(this.rooms);
  roomsTableRow = new Set<ResidenceRooms>();
  roomsTableColumns = [
    'roomType',
    'roomAvailability',
    'roomPrice',
    'roomTradingPrice',
    'roomDiscount',
    'property'
  ];
  applyRoomsFilter($event: any) {
    this.roomsDataSource.filter = $event.target.value;
  }
  getRoomsTableRow(row: any) {
    this.roomsTableRow.clear();
    this.roomsTableRow.add(row);

  }
  addRooms() {

  }

  roomsAmenitiesService(element: ResidenceRooms) {
    const config = new MatDialogConfig<any>();
    config.width = '90%';
    config.height = '90%';
    config.data = element;
    const dialogRef = this.dialog.open(RoomAmenitiesServiceComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      this.clearSelection("roomDialogRefSet");
      // this.getResidenceTableData();
    });
  }
  roomImageService(residenceRooms: ResidenceRooms) {
    const config = new MatDialogConfig<any>();
    config.width = '90%';
    config.height = '90%';
    config.data = residenceRooms;
    const dialogRef = this.dialog.open(RoomImagesServiceComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      // this.getResidenceTableData();
    });
  }
  roomPolicyService(element: ResidenceRooms) {

    const config = new MatDialogConfig<any>();
    config.width = '90%';
    config.height = '90%';
    config.data = element;
    const dialogRef = this.dialog.open(RoomPolicyServiceComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      // this.getResidenceTableData();
    });
  }
  onRoomSelectionChange(roomDialogRefSet: HTMLSelectElement, roomId: any, element: ResidenceRooms): void {
    switch (roomDialogRefSet.value) {
      case '1': this.roomImageService(element);
        break;
      case '2': this.roomsAmenitiesService(element);
        break;
      case '3': this.roomPolicyService(element);
        break;
      default:
        // Handle other cases if needed
        break;
    }
  }
  // Others code
  clearSelection(elementID: any) {
    const selectElement = document.getElementById(elementID) as HTMLSelectElement;
    if (selectElement) {
      selectElement.selectedIndex = 0; // Set the selectedIndex to 0 to select the first option
    }
  }
}