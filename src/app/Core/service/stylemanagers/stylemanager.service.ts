import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StylemanagerService {

  constructor() { }

  private styleElements: HTMLLinkElement[] = [];

  addStylesheet(href: string): void {debugger
    this.removeAllStyles();
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
    this.styleElements.push(link);
  }

  private removeAllStyles(): void {
    this.styleElements.forEach(style => document.head.removeChild(style));
    this.styleElements = [];
  }
}
