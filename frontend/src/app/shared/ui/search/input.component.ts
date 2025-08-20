import { Component, forwardRef } from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-input',
  template: `
    <div class="input-container">
      <input
        class="input"
        type="text"
        [(ngModel)]="inputValue"
        (ngModelChange)="onInput($event)"
        (blur)="onTouched()"
        placeholder="Rechercher"
      >
      @if (inputValue && inputValue.length > 0) {
        <button
          type="button"
          class="clear-button"
          (click)="clearSearch()"
          tabindex="-1">
          ×
        </button>
      }
    </div>
  `,
  imports: [
    FormsModule
  ],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  public inputValue = '';

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  public writeValue(value: string): void {
    this.inputValue = value ?? '';
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public onInput(value: string) {
    this.inputValue = value;
    this.onChange(value);
  }

  public clearSearch() {
    this.inputValue = '';
    this.onChange('');
  }
}
