import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, map, shareReplay} from 'rxjs';
import {Category} from '../models/category.model';
import {CategoryService} from '../services/category.service';
import {Group} from '../models/group.model';

@Injectable({ providedIn: 'root' })
export class CategoriesStore {

  private categoryService= inject(CategoryService);

  private _categories$ = new BehaviorSubject<Category[]>([]);
  private _search$ = new BehaviorSubject<string>('');
  private _selectGroup$ = new BehaviorSubject<number | null>(null);
  private _sort$ = new BehaviorSubject<string>('group');

  private fallbackGroup = {id: -1, name: 'Autres', color: 'm-no-color' }

  public init() {
    if(!this._categories$.value.length) {
      this.loadCategories();
    }
  }

  private loadCategories() {
    this.categoryService.getVisibleCategories().subscribe(categories => {
      this._categories$.next(categories);
    });
  }

  public groups$ = this._categories$.pipe(
    map((categories) => {
      const group: Group[] = [];
      const seen = new Set<number>();
      let hasCatUngrouped = false;

      for (const category of categories) {
        if(category.group) {
        if (category.group && !seen.has(category.group.id)) {
          seen.add(category.group.id);
          group.push(category.group);
        }
        } else {
          hasCatUngrouped = true
        }
      }

      // There is no such case in the visibleCategories List, but group is optional in Category model
      if (hasCatUngrouped) {
        group.push(this.fallbackGroup);
      }

      return group;
    }),
    shareReplay(1),
  );

  public filteredCategories$ = combineLatest([
    this._categories$,
    this._search$,
    this._selectGroup$,
    this._sort$
  ]).pipe(
    map(([categories, search, group, sort]) => {
      let res: Category[] = [...categories];

      if (search) {
        // Want to search by word instead of just by include string to prevent forgotten words in between
        const wordTab = this.normalizeText(search).split(/\s+/).filter(Boolean);

        res = res.filter(category => {
          const categoryText = this.normalizeText(category?.wording) + ' ' + this.normalizeText(category?.description);
          return wordTab.every(word => categoryText.includes(word));
          }
        );
      }

      if (group) {
        res = group === this.fallbackGroup.id ?
          res.filter((category: Category) => !category.group) :
          res.filter((category: Category) => category.group?.id === group);
      }

      if (sort === 'alphabet') {
        res.sort((a, b) => a.wording.localeCompare(b.wording));
      } else if (sort === 'group') {
        res.sort((a, b) => (a.group?.id ?? -1) - (b.group?.id ?? -1));
      }

      return res;
    }),
    shareReplay(1),
  );

  public categoriesByGroup$ = combineLatest([this.groups$, this.filteredCategories$]).pipe(
    map(([groups, categories]) => {
      const res = groups
        .map((group: Group) => ({
          group,
          categories: categories.filter((category) => category.group?.id === group.id)
        }))
        .filter((g) => g.categories.length > 0);

      const uncategorized = categories.filter(c => !c.group);
      if (uncategorized.length > 0) {
        res.push({
          group: this.fallbackGroup,
          categories: uncategorized
        });
      }

      //Sort group name in alphabetical order (see Figma wireframes)
      return res.sort((a, b) => a.group.name.localeCompare(b.group.name));
      }
    ),
    shareReplay(1),
  );

  public clearFilters() {
    this._search$.next('');
    this._selectGroup$.next(null);
  }

  /*
  ==============================
  ===== GETTER AND SETTER ======
  ==============================
  */

  public get categories$() {
    return this._categories$.asObservable();
  }

  public get sort$() {
    return this._sort$.asObservable();
  }

  public get search$() {
    return this._search$.asObservable();
  }

  public get selectGroup$() {
    return this._selectGroup$.asObservable();
  }

  public setSearch(value: string): void {
    this._search$.next(value);
  }

  public setGroup(groupId: number): void {
      this._selectGroup$.next(groupId);
  }

  public setSort(value: string): void {
    this._sort$.next(value);
  }

  //TODO: Get this function in a text.service if more text manipulation, like using a wysiwig ?
  protected normalizeText(text: string): string {
    if (!text) return '';
    return text.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .toLowerCase()
  }
}
