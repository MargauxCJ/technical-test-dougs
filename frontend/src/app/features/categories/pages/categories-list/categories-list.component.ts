import {Component, inject, OnInit} from '@angular/core';
import {CategoryCardComponent} from '../../components/category-card/category-card.component';
import {SearchComponent} from '../../../../shared/ui/search/search.component';
import {SortButtonsComponent, SortOption} from '../../../../shared/ui/sort-buttons/sort-buttons.component';
import {FormsModule} from '@angular/forms';
import {CategoriesStore} from '../../stores/categories.store';
import {SelectComponent} from '../../../../shared/ui/select/select.component';
import {Category} from '../../models/category.model';
import {CommonModule} from '@angular/common';
import {SliceToRowsPipe} from '../../../../pipes/slice-to-rows.pipe';

@Component({
  selector: 'app-categories-list',
  imports: [
    CategoryCardComponent,
    SearchComponent,
    SortButtonsComponent,
    FormsModule,
    SelectComponent,
    CommonModule,
    SliceToRowsPipe
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
  standalone: true
})
export class CategoriesListComponent implements OnInit{
  public categoriesStore: CategoriesStore = inject(CategoriesStore);

  public categories$ = this.categoriesStore.filteredCategories$;
  public categoriesByGroup$ = this.categoriesStore.categoriesByGroup$;

  public groups$ = this.categoriesStore.groups$;
  public sort$ = this.categoriesStore.sort$;
  public search$ = this.categoriesStore.search$;
  public selectGroup$ = this.categoriesStore.selectGroup$;

  public categorySelected: Category;
  public sortOptions: SortOption[] = [
    { label: 'Groupe de catégorie', value: 'group', icon: 'icon-group'},
    { label: 'Ordre alphabétique', value: 'alphabet', icon: 'icon-alphabet'},
  ];

  public ngOnInit(): void {
    this.categoriesStore.init()
  }

  public getSelectedCategory(value: Category) {
    this.categorySelected = value;
  }

  public displayCategory() {
    console.log('Category selected : ', this.categorySelected);
  }
}
