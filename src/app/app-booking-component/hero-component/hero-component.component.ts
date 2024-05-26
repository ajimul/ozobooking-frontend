
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, DatePipe, CommonModule } from '@angular/common';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-hero-component',
  standalone: true,
  templateUrl: './hero-component.component.html',
  styleUrl: './hero-component.component.css',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    DatePipe,
    CommonModule],
})
export class HeroComponentComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  ngOnInit(): void {
    this.range.valueChanges.subscribe(() => {
      this.onDateRangeChange();
    });
  }

  onDateRangeChange() {
    // You can add any logic here if needed
  }

  getStartDate(): Date | null {
    return this.range.get('start')?.value ?? null;
  }

  getEndDate(): Date | null {
    return this.range.get('end')?.value ?? null;
  }
  
  dateClass(date: Date) {
    const day = date.getDate();
    const days = [];
    days.push(new Date(2024, 5, 2));
    days.push(new Date(2024, 5, 5));
    days.push(new Date(2024, 5, 8));
    days.push(new Date(2024, 5, 12));
    days.push(new Date(2024, 5, 22)); 

    const matchingDate = days.find(element => element.getDate() === day);
    if (matchingDate) {
      return 'highlight-red';
    }

    return '';
  }
 
}