import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbHighlight, NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PageSizeComponent } from '../../../theme/shared/widgets/page-size/page-size.component';
import { CustomerData } from '../../../Core/models/Customer';
import { activeStatus, inactiveStatus, page, pageSize } from '../../../Core/utils/status-icon.constants';
import { CustomerService } from '../../../Core/service/customer/customer.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from '../../../theme/shared/service/confirm-dialog.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule, 
    HttpClientModule, 
    FormsModule, 
    NgbHighlight, 
    NgbPaginationModule, 
    PageSizeComponent,
    RouterModule
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {

  customerList: CustomerData = { totalRecords: 0, customerDtoinfo: [] };
  activeStatus: string = activeStatus;
  inactiveStatus: string = inactiveStatus;
  page: number = page;
  pageSize: number = pageSize;
  search: string = "";

  constructor(
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllCustomer(this.page, this.pageSize, this.search)
  }

  getAllCustomer(page: number, pageSize: number, search: string): void {
    this.customerService.getAllCustomer(page, pageSize, search).subscribe(
      (response) => {
        if (response.success) {
          this.customerList = response.data;
        }
      },
      (error) => {
        if (error.error) {
          this.toastr.error(error.error.message);
        }
      }
    );
  }

  onPageChange(pageNumber: number): void {
    this.page = pageNumber;
    this.getAllCustomer(pageNumber, this.pageSize, this.search);
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.getAllCustomer(this.page, this.pageSize, this.search);
  }

  onSearch(event: Event): void {
    this.search = (event.target as HTMLInputElement).value;
    this.page = 1; // Reset to first page on search
    this.getAllCustomer(this.page, this.pageSize, this.search);
  }

  editRecord(Id: number): void {
  }

  deleteRecord(Id: number): void {
    this.confirmDialogService.confirm().then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(Id).subscribe(
          (response) => {
            if (response.success) {
              this.toastr.success(response.message);
              this.getAllCustomer(this.page, this.pageSize, '');
            }
          },
          (error) => {
            if (error.error) {
              this.toastr.error(error.error.message);
            }
          }
        );
      }
    });
  }

}
