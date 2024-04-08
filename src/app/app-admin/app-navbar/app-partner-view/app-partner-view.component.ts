import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Residence, ResidenceRooms, ResidenceRoomsImages } from '../../../app-interface/Residence';
import { ApiService } from '../../../api-service/api-service.service';
import { AppPartnerSignupComponent } from './app-partner-signup/app-partner-signup.component';
import { AppPartnerUpdateComponent } from './app-partner-update/app-partner-update.component';
import { AppResidenceImageServiceComponent } from './app-residence-image-service/app-residence-image-service.component';
import { AppResidenceAmentitiesServiceComponent } from './app-residence-amentities-service/app-residence-amentities-service.component';
import { AppRoomAmentitiesServiceComponent } from './app-room-amentities-service/app-room-amentities-service.component';
import { AppRoomImagesServiceComponent } from './app-room-images-service/app-room-images-service.component';
import { AppRoomPolicyServiceComponent } from './app-room-policy-service/app-room-policy-service.component';
import { AppPartnerAgreementComponent } from './app-partner-agreement/app-partner-agreement.component';
import { AppResidenceLocationServiceComponent } from './app-residence-location-service/app-residence-location-service.component';
import { AppResidenceRoomsServiceComponent } from './app-residence-rooms-service/app-residence-rooms-service.component';

@Component({
  selector: 'app-app-partner-view',
  standalone: true,
  imports: [MatTableModule, CommonModule, FormsModule],
  providers: [{
    provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
      panelClass: ['mat-mdc-dialog-container', 'mdc-dialog__surface']
    }
  }],
  templateUrl: './app-partner-view.component.html',
  styleUrl: './app-partner-view.component.css',
})
export class AppPartnerViewComponent {
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
  // residenceTableRow = new Set<Residence>();
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
  applyResidenceFilter($event: any) {
    this.residenceDataSource.filter = $event.target.value;
  }
  // getResidenceTableRow(row: any) {
  //   this.residenceTableRow.clear();
  //   this.residenceTableRow.add(row);
   

  // }
  addPartner() {
    const config = new MatDialogConfig<any>();
    config.width = '40%';
    config.height = '90%';
    config.data = [];
    config.panelClass = ['custom-dialog-bg'];
    const dialogRef = this.dialog.open(AppPartnerSignupComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      this.getResidenceTableData();
    });
  }

  deletePartner($event: number): void {
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
  }
  updatePartner(element: Residence) {
    const config = new MatDialogConfig<any>();
    config.width = '30%';
    config.height = '90%';
    config.data = element;
    const dialogRef = this.dialog.open(AppPartnerUpdateComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      // this.getResidenceTableData();
    });
  }
  residenceAgreementService(residenceId: any) {
    const config = new MatDialogConfig<any>();
    config.width = '90%';
    config.height = '90%';
    config.data = { residenceId };
    const dialogRef = this.dialog.open(AppPartnerAgreementComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      // this.getResidenceTableData();
    });
  }
  residenceImageService(residenceId: any) {
    const config = new MatDialogConfig<any>();
    config.width = '90%';
    config.height = '90%';
    config.data = { residenceId };
    const dialogRef = this.dialog.open(AppResidenceImageServiceComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      // this.getResidenceTableData();
    });
  }
  residenceAmentitiesService(element:Residence) {
    const config = new MatDialogConfig<any>();
    config.width = '90%';
    config.height = '90%';
    config.data = element;
    const dialogRef = this.dialog.open(AppResidenceAmentitiesServiceComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      this.clearSelection('residenceDialogRefSet');
      // this.getResidenceTableData();
    });
  }
  residenceLocationService(residenceId: any) {
    const config = new MatDialogConfig<any>();
    config.width = '90%';
    config.height = '90%';
    config.data = { residenceId };
    const dialogRef = this.dialog.open(AppResidenceLocationServiceComponent, config);
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
    const dialogRef = this.dialog.open(AppResidenceRoomsServiceComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      this.clearSelection('residenceDialogRefSet');
      // this.getResidenceTableData();
    });
  }

  onResidenceSelectionChange(residenceDialogRefSet: HTMLSelectElement, element: Residence): void {
    switch (residenceDialogRefSet.value) {
      case '1': this.residenceAgreementService(element.residenceId);
        break;
      case '2': this.residenceImageService(element.residenceId);
        break;
      case '3': this.residenceAmentitiesService(element);
        break;
      case '4': this.residenceLocationService(element.residenceId);
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
    'property',
    'action',
    'view',
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
  deleteRoom($event: number): void {

  }
  updateRoom($event: number): void { }
  roomsAmentitiesService() {
    const config = new MatDialogConfig<any>();
    config.width = '90%';
    config.height = '90%';
    config.data = this.roomsTableRow;
    const dialogRef = this.dialog.open(AppRoomAmentitiesServiceComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      this.clearSelection("roomDialogRefSet");
      // this.getResidenceTableData();
    });
  }
  roomImageService(element:ResidenceRooms) {
    const config = new MatDialogConfig<any>();
    config.width = '90%';
    config.height = '90%';
    config.data = element;
    const dialogRef = this.dialog.open(AppRoomImagesServiceComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      // this.getResidenceTableData();
    });
  }
  roomPolicyService(element: ResidenceRooms) {

    const config = new MatDialogConfig<any>();
    config.width = '90%';
    config.height = '90%';
    config.data = element;
    const dialogRef = this.dialog.open(AppRoomPolicyServiceComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      // this.getResidenceTableData();
    });
  }
  onRoomSelectionChange(roomDialogRefSet: HTMLSelectElement, roomId: any,element:ResidenceRooms): void {
    switch (roomDialogRefSet.value) {
      case '1': this.roomImageService(element);
        break;
      case '2': this.roomsAmentitiesService();
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
