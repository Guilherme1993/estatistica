import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'estatistica';

  constructor() {

    if (window.matchMedia(`(min-width: 800px)`).matches) {
      localStorage.setItem("width", '50%');
    } else {
      localStorage.setItem("width", '90%');
    }
  }
}
