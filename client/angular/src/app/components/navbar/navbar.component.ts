import { Component } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse?.classList.contains('show')) {
          new (window as any).bootstrap.Collapse(navbarCollapse).hide();
        }
      }
    });
  }
}
