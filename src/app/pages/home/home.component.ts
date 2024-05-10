import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  roomId: string =  (Math.floor(Math.random() * (300 - 10 + 1)) + 10).toString();
 
  private route = inject(Router)

  enterRoom() {
    console.log(this.roomId);
    this.route.navigateByUrl(`/room/${this.roomId}`);
  }
}
