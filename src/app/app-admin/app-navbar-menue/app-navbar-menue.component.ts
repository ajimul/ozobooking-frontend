import { Component } from '@angular/core';
import { Residence } from '../../app-interface/Residence';
import { ApiService } from '../../api-service/api-service.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { AppPartnerSignupComponent } from '../app-partner-signup/app-partner-signup.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-app-navbar-menue',
  standalone: true,
  imports: [MatTableModule, CommonModule, FormsModule, MatDialogModule],
  templateUrl: './app-navbar-menue.component.html',
  styleUrl: './app-navbar-menue.component.css',
})
export class AppNavbarMenueComponent {
  customDialogClass = 'custom-dialog-bgx';
  residence: Residence[] = [];
  dataSource = new MatTableDataSource<Residence>(this.residence);
  tableRow = new Set<Residence>();
  tableColumns = [
    'residenceId',
    'residenceName',
    'residenceType',
    'residenceLocation',
    'isActive',
    'property',
  ];

  constructor(private dialog: MatDialog, private service: ApiService) {}
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

  ngOnInit(): void {
    this.getTableData();
  }

  applyFilter($event: any) {
    // after applying a filter to the MatTableDataSource automatically updates the data displayed in the table based on the filter criteria.
    this.dataSource.filter = $event.target.value;
  }
  getRow() {
    // this.tableRow.forEach(element => {
    console.log(this.tableRow);
    // })
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
}
