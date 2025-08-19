import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';

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
