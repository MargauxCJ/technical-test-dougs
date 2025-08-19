import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, shareReplay } from 'rxjs';
import { Category, CategoryGroup } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { Group } from '../models/group.model';


interface CategoriesState {
  categories: Category[];
  search: string;
  sort: string;
  selectedGroupId: number | null;
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class CategoriesStore {
  private categoryService = inject(CategoryService);

  private readonly fallbackGroup: Group = { id: -1, name: 'Autres', color: 'm-no-color' };

  private readonly initialState: CategoriesState = {
    categories: [],
    search: '',
    sort: 'group',
    selectedGroupId: null,
    loading: false,
    error: null,
  };

  private readonly _state$ = new BehaviorSubject<CategoriesState>(this.initialState);
  readonly state$ = this._state$.asObservable();

  readonly categories$ = this.state$.pipe(map(state => state.categories));
  readonly search$ = this.state$.pipe(map(state => state.search));
  readonly sort$ = this.state$.pipe(map(state => state.sort));
  readonly selectedGroupId$ = this.state$.pipe(map(state => state.selectedGroupId));
  readonly loading$ = this.state$.pipe(map(state => state.loading));
  readonly error$ = this.state$.pipe(map(state => state.error));

  readonly groups$ = this.categories$.pipe(
    map((categories) => {
      const groups: Group[] = [];
      const seen = new Set<number>();
      let hasCatUngrouped = false;

      for (const category of categories) {
        if (category.group) {
          if (!seen.has(category.group.id)) {
            seen.add(category.group.id);
            groups.push(category.group);
          }
        } else {
          hasCatUngrouped = true;
        }
      }

      if (hasCatUngrouped) {
        groups.push(this.fallbackGroup);
      }

      return groups;
    }),
    shareReplay(1),
  );

  readonly filteredCategories$ = combineLatest([
    this.categories$,
    this.search$,
    this.selectedGroupId$,
    this.sort$,
  ]).pipe(
    map(([categories, search, group, sort]) => {
      let res: Category[] = [...categories];

      if (search) {
        const wordTab = this.normalizeText(search).split(/\s+/).filter(Boolean);
        res = res.filter(category => {
          const categoryText = this.normalizeText(category?.wording) + ' ' + this.normalizeText(category?.description);
          return wordTab.every(word => categoryText.includes(word));
        });
      }

      if (group) {
        res = group === this.fallbackGroup.id
          ? res.filter(c => !c.group)
          : res.filter(c => c.group?.id === group);
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

  readonly categoriesByGroup$ = combineLatest([this.groups$, this.filteredCategories$]).pipe(
    map(([groups, categories]) => {
      const res = groups
        .map(group => ({
          group,
          categories: categories.filter(c => c.group?.id === group.id),
        }))
        .filter(g => g.categories.length > 0);

      const uncategorized = categories.filter(c => !c.group);
      if (uncategorized.length > 0) {
        res.push({ group: this.fallbackGroup, categories: uncategorized });
      }

      return res.sort((a, b) => a.group.name.localeCompare(b.group.name));
    }),
    shareReplay(1),
  );

  init() {
    if (!this._state$.value.categories.length) {
      this.loadCategories();
    }
  }

  private loadCategories() {
    this.patchState({ loading: true, error: null });

    this.categoryService.getVisibleCategories().subscribe({
      next: (categories) => {
        this.patchState({ categories, loading: false });
      },
      error: () => {
        this.patchState({ loading: false, error: 'Impossible de charger les catégories' });
      },
    });
  }

  setSearch(value: string) {
    this.patchState({ search: value });
  }

  setGroup(groupId: number | null) {
    this.patchState({ selectedGroupId: groupId });
  }

  setSort(value: string) {
    this.patchState({ sort: value });
  }

  clearFilters() {
    this.patchState({ search: '', selectedGroupId: null });
  }

  private patchState(patch: Partial<CategoriesState>) {
    this._state$.next({ ...this._state$.value, ...patch });
  }

  private normalizeText(text: string): string {
    if (!text) return '';
    return text.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .toLowerCase();
  }
}
