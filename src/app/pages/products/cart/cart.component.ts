import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  public cartService = inject(CartService);

  items = this.cartService.items;
  totalCount = this.cartService.totalCount;
  totalPrice = this.cartService.totalPrice;

  ngOnInit(): void {
    this.cartService.loadCart();
  }

  updateQuantity(productId: string, change: number): void {
    this.cartService.updateQuantity(productId, change);
  }

  removeFromCart(productId: string): void {
    if (confirm('Do you want to remove this product entirely?')) {
      this.cartService.removeFromCart(productId);
    }
  }

  onCheckout(): void {
    if (this.items().length === 0) return;

    console.log('Finalizing order for:', this.items());
    alert('Thank you for your order! Malinka Store team will contact you soon.');
  }
}