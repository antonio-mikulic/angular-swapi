import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor() { }

  addToArray(key: string, value: any) {
    let items = this.get(key) ?? [];
    items.push(value);
    this.save(key, items);
  }

  removeFromArray(key: string, value: any) {
    let items = this.get(key) as any[] ?? [];
    items = items.filter(x => JSON.stringify(x) !== JSON.stringify(value));
    this.save(key, items);
  }

  save(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    const found = localStorage.getItem(key);
    if(!found) return null;
    return JSON.parse(found);
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }
}
