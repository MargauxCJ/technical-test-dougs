import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full',
  },
  {
    path: 'categories',
    title: 'Catégories',
    loadComponent: () => import('./features/categories/pages/categories-list/categories-list.component').then(m => m.CategoriesListComponent),
  },
];
