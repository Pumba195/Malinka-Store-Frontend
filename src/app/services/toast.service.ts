import { Injectable } from '@angular/core';

export type ToastType = 'success' | 'error' | 'cart' | 'wishlist';

@Injectable({ providedIn: 'root' })
export class ToastService {
  public showToast = false;
  public messageTitle = '';
  public toastMessage = '';
  public isError = false;
  public clickCount = 0;
  public currentIcon = '🍓';
  public currentType: ToastType = 'success';

  private toastTimeout: any;

  show(title: string, message: string = '', type: ToastType = 'success') {
    this.currentType = type;
    this.isError = type === 'error';
    
    const iconMap: Record<ToastType, string> = {
      success: '🍓',
      error: '⚠️',
      cart: '🛒',
      wishlist: '❤️'
    };
    
    this.currentIcon = iconMap[type];

    if (this.showToast && this.messageTitle === title && this.toastMessage === message) {
      this.clickCount++;
    } else {
      this.messageTitle = title;
      this.toastMessage = message;
      this.clickCount = 1;
    }

    this.showToast = true;

    if (this.toastTimeout) clearTimeout(this.toastTimeout);

    this.toastTimeout = setTimeout(() => {
      this.showToast = false;
      this.clickCount = 0;
      this.messageTitle = '';
      this.toastMessage = '';
    }, 3000);
  }
}