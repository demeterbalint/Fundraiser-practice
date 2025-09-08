import {AfterViewInit, Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit{
  title = 'angular';

  @HostListener('window:resize')
  onResize() {
    this.setNavbarPadding();
  }

  ngAfterViewInit(){
    this.setNavbarPadding();
  }

  private setNavbarPadding() {
    const navbar = document.querySelector('.navbar');
    const content = document.querySelector('.main-content');
    if (navbar && content) {
      const height = navbar.clientHeight;
      content.setAttribute('style', `padding-top: ${height}px;`);
    }
  }
}
