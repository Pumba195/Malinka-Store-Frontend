import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductItem } from '../models/product-item.model';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient) { }

  private apiURL = "http://localhost:3000";
  private favorites = signal<ProductItem[]>([]);

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/products`);
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.apiURL}/products/${id}`);
  }

  toggleFavorite(productId: string): void {
    this.http.patch<ProductItem[]>(`${this.apiURL}/cart/favorites/toggle`, { productId }).subscribe({
      next: (updatedFavorites) => {
        this.favorites.set(updatedFavorites);
      },
      error: (err) => console.error('Ошибка при переключении лайка:', err)
    });
  }

  isFavorite(productId: string): boolean {
    return this.favorites().some(item => item._id === productId);
  }

  getFullFavorites() {
    this.http.get<ProductItem[]>(`${this.apiURL}/cart/favorites`).subscribe({
      next: (data) => this.favorites.set(data),
      error: (err) => console.error(err)
    });;
  }

  // loadFullFavorites() {
  //   this.http.get<string[]>(`${this.apiURL}/cart/favorites-ids`).subscribe({
  //     next: (ids) => this.favorites.set(ids),
  //     error: (err) => console.error('Could not load favorites', err)
  //   });
  // }

  clearFavorites() {
    this.favorites.set([]);
  }

  get favoriteItems() {
    return this.favorites.asReadonly();
  }
}