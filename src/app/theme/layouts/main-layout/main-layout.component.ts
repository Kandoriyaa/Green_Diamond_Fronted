import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponentComponent } from '../breadcrumb-component/breadcrumb-component.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SideMenuComponent } from '../side-menu/side-menu.component';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent, SideMenuComponent, FooterComponent,BreadcrumbComponentComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  isSubmenuVisible: boolean = true;
}
