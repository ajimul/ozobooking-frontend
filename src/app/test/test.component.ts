import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
constructor(private route: Router){

}
gotoMain(){
  this.route.navigate(['/home']);
}
}
