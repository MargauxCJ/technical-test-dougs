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
  {
    path: '**',
    title: 'Page introuvable',
    loadComponent: () => import('./shared/ui/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
