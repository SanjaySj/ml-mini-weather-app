import { Component } from '@angular/core';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';
  showSpinner = true;
  timerSub: Subscription;

  constructor() {
    const timerSub = timer(3000).subscribe(() => { this.showSpinner = false, timerSub.unsubscribe(); });
  }
}
