import { Pipe, PipeTransform } from '@angular/core';

@Pipe({standalone: true, name: 'sliceToRows'})
export class SliceToRowsPipe<T> implements PipeTransform {
  transform(array: T[], rowSize: number): T[][] {
    if (!array) return [];
    const rows = [];
    for (let i = 0; i < array.length; i += rowSize) {
      rows.push(array.slice(i, i + rowSize));
    }
    return rows;
  }
}
