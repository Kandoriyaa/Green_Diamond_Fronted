import { Component } from '@angular/core';
import { Breadcrumb } from '../../../Core/models/Breadcrumb';
import { Observable } from 'rxjs';
import { BreadcrumbService } from '../../../Core/service/BreadcrumbService/breadcrumb-service.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-breadcrumb-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb-component.component.html',
  styleUrls: ['./breadcrumb-component.component.css'] 
})
export class BreadcrumbComponentComponent {
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private readonly breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
    this.breadcrumbs$.subscribe(data => console.log(data));
  }

}