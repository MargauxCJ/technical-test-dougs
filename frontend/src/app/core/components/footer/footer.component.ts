import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="footer">
      <ng-content select="[footer-content]"></ng-content>
    </footer>
  `,
})
export class FooterComponent {

}
