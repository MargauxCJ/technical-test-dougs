import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from '../../models/category.model';
import {NgClass} from '@angular/common';
import {AccessibleClickDirective} from '../../../../shared/directives/accessible-click.directive';

@Component({
  selector: 'app-category-card',
  imports: [
    NgClass,
    AccessibleClickDirective,
  ],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
  standalone: true
})
export class CategoryCardComponent {
  @Input() public category: Category;
  @Input() public isCategorySelected?: boolean = false;
  @Input() public showTag = true;
  @Output() public selection = new EventEmitter<Category>();

  public selectCategory() {
      if (this.isCategorySelected) {
      this.selection.emit(null)
      return;
    }
    this.selection.emit(this.category);
  }
}
