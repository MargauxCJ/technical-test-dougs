import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-select',
  template: `
    <select [(ngModel)]="selectedValue" (ngModelChange)="onSelect($event)">
      <option [ngValue]="defaultOption.value">{{ defaultOption.label }}</option>
      @for (option of options; track option[valueKey]) {
        <option [ngValue]="option[valueKey]">{{ option[labelKey] }}</option>
      }
    </select>
  `,
  styles: [``],
  imports: [
    FormsModule,
  ],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent<T, K extends keyof T = keyof T> implements ControlValueAccessor, OnInit {
  @Input() public options: T[] = [];
  @Input() public defaultOption?: {value: T[K] | null, label: string} = {value: null, label: 'Tous'};
  @Input() public labelKey: K;
  @Input() public valueKey: K;

  selectedValue: T[K] | null = null;

  onChange: (value: T[K] | null) => void = () => {};
  onTouched: () => void = () => {};

  public ngOnInit(): void {
    this.selectedValue = this.defaultOption?.value ?? null;
  }

  writeValue(value: T[K] | null): void {
    this.selectedValue = value ?? this.defaultOption.value ?? null;
  }

  registerOnChange(fn: (value: T[K] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onSelect(value: T[K] | null) {
    this.selectedValue = value;
    this.onChange(this.selectedValue);
    this.onTouched();
  }
}
