import {Component, inject, OnInit} from '@angular/core';
import {CategoryCardComponent} from '../../components/category-card/category-card.component';
import {SearchComponent} from '../../../../shared/ui/search/search.component';
import {SortButtonsComponent, SortOption} from '../../../../shared/ui/sort-buttons/sort-buttons.component';
import {FormsModule} from '@angular/forms';
import {CategoriesStore} from '../../stores/categories.store';
import {SelectComponent} from '../../../../shared/ui/select/select.component';
import {Category} from '../../models/category.model';
import {CommonModule} from '@angular/common';
import {SliceToRowsPipe} from '../../../../shared/pipes/slice-to-rows.pipe';
import {LoadingComponent} from '../../../../shared/ui/loading/loading.component';
import {FooterComponent} from '../../../../core/components/footer/footer.component';
import {HeaderComponent} from '../../../../core/components/header/header.component';

@Component({
  selector: 'app-categories-list',
  imports: [
    CategoryCardComponent,
    SearchComponent,
    SortButtonsComponent,
    FormsModule,
    SelectComponent,
    CommonModule,
    SliceToRowsPipe,
    LoadingComponent,
    FooterComponent,
    HeaderComponent,
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
  standalone: true
})
export class CategoriesListComponent implements OnInit {
  public categoriesStore: CategoriesStore = inject(CategoriesStore);

  public listColumnNumber = 2;

  public sortOptions: SortOption[] = [
    { label: 'Groupe de catégorie', value: 'group', icon: 'icon-group'},
    { label: 'Ordre alphabétique', value: 'alphabet', icon: 'icon-alphabet'},
  ];

  public selectedCategory: Category;

  getEmptyColumns(usedColumns: number, totalColumns: number): number[] {
    const emptyCount = totalColumns - usedColumns;
    return emptyCount > 0 ? Array(emptyCount).fill(0) : [];
  }

  public ngOnInit(): void {
    this.categoriesStore.init();
  }

  public getSelectedCategory(value: Category) {
    this.selectedCategory = value;
  }

  public displayCategory() {
    console.log('category selected : ', this.selectedCategory);
  }
}
