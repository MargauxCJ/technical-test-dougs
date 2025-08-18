import {Directive, HostListener, Output, EventEmitter, HostBinding} from '@angular/core';

@Directive({
  selector: '[appAccessibleClick]',
  standalone: true
})
export class AccessibleClickDirective {
  //TODO: Could add arrow hostlistener to navigate with arrow instead of tab in categories for more accessibility
  @Output() accessibleClick = new EventEmitter<void>();
  @HostBinding('attr.role') role = 'button';
  @HostBinding('attr.tabindex') tabIndex = 0;

  @HostListener('click')
  onClick() {
    this.accessibleClick.emit();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.accessibleClick.emit();
    }
  }
}
