import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  get tagsHistory(): string[] {
    return [...this._tagsHistory]; // spread para romper la referencia de JS
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this._tagsHistory.unshift(tag);
    console.log(tag);
  }


}
