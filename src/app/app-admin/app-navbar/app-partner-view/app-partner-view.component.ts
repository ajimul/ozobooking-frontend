import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Residence } from '../../../app-interface/Residence';
import { ApiService } from '../../../api-service/api-service.service';
import { AppPartnerSignupComponent } from './app-partner-signup/app-partner-signup.component';
import { AppPartnerUpdateComponent } from './app-partner-update/app-partner-update.component';
import { AppResidenceImageServiceComponent } from './app-residence-image-service/app-residence-image-service.component';
import { AppResidenceAmentitiesServiceComponent } from './app-residence-amentities-service/app-residence-amentities-service.component';

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
  residence: Residence[] = [];
  dataSource = new MatTableDataSource<Residence>(this.residence);
  tableRow = new Set<Residence>();
  newData = new Set<Residence>();
  tableColumns = [
    'residenceId',
    'residenceName',
    'residenceType',
    'residenceLocation',
    'isActive',
    'property',
    'action',
    'view',
  ];

  constructor(private dialog: MatDialog, private service: ApiService) { }
  getTableData(): void {
    this.residence = [];
    this.dataSource = new MatTableDataSource<Residence>(this.residence);
    this.service.getResidences().subscribe({
      next: (data) => {
        this.residence = data;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataSource = new MatTableDataSource<Residence>(this.residence);
      },
    });
  }
  getTableRow(row: any) {
    this.tableRow.clear();
    this.tableRow.add(row);
  }
  ngOnInit(): void {
    this.getTableData();
  }

  applyFilter($event: any) {
    // after applying a filter to the MatTableDataSource automatically updates the data displayed in the table based on the filter criteria.
    this.dataSource.filter = $event.target.value;
  }

  onStatusChange(element: Residence): void {
    if (element.isActive) {
    }
  }
  onSelectedProperty(element: Residence): void {
    if (element.isActive) {
    }
  }
  addPartner() {
    const config = new MatDialogConfig<any>();
    // config.position = { top: '0px', right: '0px' };
    config.width = '40%';
    config.height = '90%';
    config.data = [];
    config.panelClass = ['custom-dialog-bg'];
    const dialogRef = this.dialog.open(AppPartnerSignupComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      this.getTableData();
    });
  }
  partnerUpdate(element: Residence) {
    const config = new MatDialogConfig<any>();
    config.width = '30%';
    config.height = '90%';
    config.data = element;
    const dialogRef = this.dialog.open(AppPartnerUpdateComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      this.getTableData();
    });
  }
  onSelectionChange(mySelect: HTMLSelectElement, residenceId: any): void {
    switch (mySelect.value) {
      case '1':
       
        break;
      case '2':
        this.residenceImageService(residenceId);
        break;
      case '3':
        this.residenceAmentitiesService(residenceId);
        break;
      case '4':
        
        break;
      default:
        // Handle other cases if needed
        break;
    }
  }
  residenceImageService(residenceId: any) {
    const config = new MatDialogConfig<any>();
    config.width = '90%';
    config.height = '90%';
    config.data = { residenceId };
    const dialogRef = this.dialog.open(AppResidenceImageServiceComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      this.getTableData();
    });
  }

  residenceAmentitiesService(residenceId: any) {
    const config = new MatDialogConfig<any>();
    config.width = '90%';
    config.height = '90%';
    config.data = this.tableRow;
    const dialogRef = this.dialog.open(AppResidenceAmentitiesServiceComponent, config);
    dialogRef.afterClosed().subscribe((response: any) => {
      this.getTableData();
    });
  }
  deletePartner($event: number): void {
    this.service.deleteResidence($event).subscribe({
      next: (response) => {
        alert(response.message);
        this.getTableData();
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
}
