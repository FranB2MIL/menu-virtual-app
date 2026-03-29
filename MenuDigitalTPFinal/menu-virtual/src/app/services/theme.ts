import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Theme {
  private themeKey = 'theme-preference';

  constructor() {
    this.loadTheme();
  }

  setTheme(theme: 'light' | 'dark' | 'auto') {
    localStorage.setItem(this.themeKey, theme);
    this.applyTheme(theme);
  }

  loadTheme() {
    const saved = localStorage.getItem(this.themeKey) as 'light' | 'dark' | 'auto' | null;

    if (saved) {
      this.applyTheme(saved);
    } else {
      this.applyTheme('auto');
    }
  }

  private applyTheme(theme: 'light' | 'dark' | 'auto') {
    const html = document.documentElement;

    if (theme === 'light') {
      html.classList.remove('dark');
      return;
    }

    if (theme === 'dark') {
      html.classList.add('dark');
      return;
    }

    // automatic = follow system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.classList.toggle('dark', prefersDark);
  }
}
