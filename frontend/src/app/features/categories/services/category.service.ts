import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/category.model';
import {forkJoin, map, Observable} from 'rxjs';

const API_PREFIX = '/api/';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);

  public getAllCategories(): Observable<Category[]>  {
    return this.http.get<Category[]>(API_PREFIX+'all-categories');
  }

  public getVisibleCategoriesIds(): Observable<{id: number}[]> {
    return this.http.get<{id: number}[]>(API_PREFIX+'visible-categories')
  }

  public getVisibleCategories(): Observable<Category[]> {
    return forkJoin({
      all: this.getAllCategories(),
      visibles: this.getVisibleCategoriesIds(),
    })
      .pipe(
        map(({all, visibles}) => {
          const visibleIds = visibles.map(v => v.id);
          return all.filter(category => visibleIds.includes(category.id));
        })
      )
  }
}
