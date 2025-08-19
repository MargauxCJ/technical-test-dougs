import { Component, forwardRef } from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  template: `
    <input
      class="search-bar"
      type="text"
      [(ngModel)]="searchValue"
      (ngModelChange)="onInput($event)"
      (blur)="onTouched()"
      placeholder="Rechercher"
    >
  `,
  imports: [
    FormsModule
  ],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
      multi: true
    }
  ]
})
export class SearchComponent implements ControlValueAccessor {
  public searchValue = '';

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  public writeValue(value: string): void {
    this.searchValue = value ?? '';
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public onInput(value: string) {
    this.searchValue = value;
    this.onChange(value);
  }
}
