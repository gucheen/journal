import { Injectable } from '@angular/core';

interface ToastServiceInterface {
  toastList: Element[];
  timerList: Number[];
  show(message: string, type?: string): void;
}

@Injectable()
export class ToastService implements ToastServiceInterface {
  private Container: Element;

  toastList = [];

  timerList = [];

  constructor() {
    this.Container = document.createElement('div');
    this.Container.className = 'toast-container';
    document.body.appendChild(this.Container);
  }

  show(message: string, type?: string) {
    let toast = document.createElement('div');
    toast.textContent = message;
    toast.className = `toast ${type ? type : 'success'}`;
    this.Container.appendChild(toast);
    this.toastList.push(toast);
    this.destroy(toast);
  }

  private destroy(toast: Element) {
    this.timerList.push(
      window.setTimeout(
        () => this.Container.removeChild(toast),
        3000
      )
    );
  }
}