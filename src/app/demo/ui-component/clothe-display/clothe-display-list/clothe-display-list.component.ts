import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbHighlight, NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClotheDisplayData } from '../../../../Core/models/ClotheDisplay';
import { ClothedisplayService } from '../../../../Core/service/clothedisplay/clothedisplay.service';
import { activeStatus, inactiveStatus, page, pageSize } from '../../../../Core/utils/status-icon.constants';
import { ConfirmDialogService } from '../../../../theme/shared/service/confirm-dialog.service';
import { ImageComponent } from '../../../../theme/shared/widgets/image/image.component';
import { PageSizeComponent } from '../../../../theme/shared/widgets/page-size/page-size.component';


@Component({
  selector: 'app-clothe-display-list',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule,
    FormsModule,
    NgbHighlight,
    NgbPaginationModule,
    PageSizeComponent,
    ImageComponent],
  templateUrl: './clothe-display-list.component.html',
  styleUrl: './clothe-display-list.component.css'
})
export class ClotheDisplayListComponent {
  private modalService = inject(NgbModal);
  clotheDisplayList: ClotheDisplayData = { totalRecords: 0, clothedisplayDtoinfo: [] }
  activeStatus: string = activeStatus;
  inactiveStatus: string = inactiveStatus;
  page: number = page; // Default page
  pageSize: number = pageSize; // Default page size
  search: string = "";

  constructor(
    private clothedisplayservice: ClothedisplayService,
    private toastr: ToastrService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService,
  ) {
  }
  ngOnInit(): void {
    this.getAllClotheDisplay(this.page, this.pageSize, this.search);
  }
  
  getAllClotheDisplay(page: number = this.page, pageSize: number = this.pageSize, search: string = this.search) {debugger
    this.clothedisplayservice.getAllClotheDisplay(page, pageSize, search).subscribe(
      response => {
        if (response.success) {debugger
          this.clotheDisplayList = response.data;
        }
      },
      error => {
        if (error.error) {
          this.toastr.error(error.error.message);
        }
      }
    );
  }

  onImageError(event: any) {
    event.target.src = 'path/to/default-image.png'; // Fallback image
  }
  

  onPageChange(pageNumber: number) {
    this.page = pageNumber;
    this.getAllClotheDisplay(pageNumber, this.pageSize, this.search)
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.getAllClotheDisplay(this.page, this.pageSize, this.search)
  }

  onSearch(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.page = 1; // Reset to first page on search
    this.getAllClotheDisplay(this.page, this.pageSize, this.search);
  }

  editRecord(id: number) {debugger
    this.router.navigate(['/ui-componet/clothe-display/edit'],  { queryParams: { id: id } });
  }

   deleteRecord(id: number) {
    this.confirmDialogService.confirm().then((result) => {
      if (result.isConfirmed) {
        this.clothedisplayservice.deleteClotheDisplaye(id).subscribe(
          response => {
            if (response.success) {
              this.toastr.success(response.message);
              this.getAllClotheDisplay(this.page, this.pageSize, "");
            }
          },
          error => {
            if (error.error) {
              this.toastr.error(error.error.message);
            }
          }
        );
      }
    })
  }
}

