import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <header class="header">
      <h1><ng-content select="[header-title]"></ng-content></h1>
      <ng-content select="[header-content]"></ng-content>
    </header>
  `,
})
export class HeaderComponent {

}
