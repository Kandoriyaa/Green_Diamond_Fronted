import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent{
  constructor(
    private router: Router) {
}


isMainActive(route: string): boolean {
    // const currentUrl = this.router.url;
    // const segments = currentUrl.split('/');
    // return route.includes(segments[1]);
    const currentUrl = this.router.url;
    const segments = currentUrl.split('/');
    return route.includes(segments[1]); 
}

isSubMenuActive(route: string): boolean {
    const currentUrl = this.router.url;
    const segments = currentUrl.split('/');
    return route.includes(segments[1] + "/" + segments[2]);
}


}
