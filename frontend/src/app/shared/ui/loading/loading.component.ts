import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-animation-container">
      <p>Chargement en cours</p>
      <div class="loading-animation">
        <img src="dougs-logo.svg" class="logo" alt="dougs-logo">
        <img src="dougs-logo.svg" class="logo" alt="dougs-logo">
        <img src="dougs-logo.svg" class="logo" alt="dougs-logo">
      </div>
    </div>
  `,
  imports: [
    FormsModule,
  ],
  standalone: true,
})
export class LoadingComponent {

}
