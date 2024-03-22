import { Component } from '@angular/core';
import { Residence } from '../../app-interface/Residence';
import { ApiService } from '../../api-service/api-service.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-app-navbar-menue',
  standalone: true,
  imports: [MatTableModule, CommonModule, FormsModule],
  templateUrl: './app-navbar-menue.component.html',
  styleUrl: './app-navbar-menue.component.css',
})
export class AppNavbarMenueComponent {

  residence: Residence[] = [ ];
  dataSource = new MatTableDataSource<Residence>(this.residence);
  tableRow = new Set<Residence>();
  tableColumns = [
    'residenceId',
    'residenceName',
    'residenceType',
    'residenceLocation',
    'isActive',
  ];

  constructor(private dialog: MatDialog, private service: ApiService) {

  }
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
  this.dataSource.filter = $event.target.value;
}

  onStatusChange(element: Residence): void {
    if (element.isActive) {
    
    }
  }
}
