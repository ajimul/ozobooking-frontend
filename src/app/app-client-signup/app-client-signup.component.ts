import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-app-client-signup',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatIconModule,CommonModule],
  templateUrl: './app-client-signup.component.html',
  styleUrl: './app-client-signup.component.css'
})
export class AppClientSignupComponent {
  formInventory!: FormGroup;
  formSubmit() {
  }
}
