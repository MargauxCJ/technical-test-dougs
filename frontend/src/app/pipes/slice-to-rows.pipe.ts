import { Pipe, PipeTransform } from '@angular/core';
import {Category} from '../features/categories/models/category.model';

@Pipe({standalone: true, name: 'sliceToRows'})
export class SliceToRowsPipe implements PipeTransform {
  transform(array: Category[], rowSize: number): Category[][] {
    if (!array) return [];
    const rows = [];
    for (let i = 0; i < array.length; i += rowSize) {
      rows.push(array.slice(i, i + rowSize));
    }
    return rows;
  }
}
