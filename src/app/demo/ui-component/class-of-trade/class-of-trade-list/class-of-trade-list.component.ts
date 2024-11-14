import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { NgbHighlight, NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClassOfTradeAddComponent } from '../class-of-trade-add/class-of-trade-add.component';
import { ClassOfTradeData } from '../../../../Core/models/ClassOfTrade';
import { ClassoftradeService } from '../../../../Core/service/classoftrade/classoftrade.service';
import { activeStatus, inactiveStatus, page, pageSize } from '../../../../Core/utils/status-icon.constants';
import { ConfirmDialogService } from '../../../../theme/shared/service/confirm-dialog.service';
import { PageSizeComponent } from '../../../../theme/shared/widgets/page-size/page-size.component';

@Component({
  selector: 'app-class-of-trade-list',
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
  templateUrl: './class-of-trade-list.component.html',
  styleUrls: ['./class-of-trade-list.component.css']
})
export class ClassOfTradeListComponent implements OnInit {

  classOfTradeDataList: ClassOfTradeData = { totalRecords: 0, classOfTradeDtoinfo: [] };
  activeStatus: string = activeStatus;
  inactiveStatus: string = inactiveStatus;
  page: number = page;
  pageSize: number = pageSize;
  search: string = "";

  constructor(
    private classOfTradeservice: ClassoftradeService,
    private toastr: ToastrService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllClassOfTrade(this.page, this.pageSize, this.search);
  }

  getAllClassOfTrade(page: number, pageSize: number, search: string): void {
    this.classOfTradeservice.getAllClassOfTrade(page, pageSize, search).subscribe(
      (response) => {
        if (response.success) {
          this.classOfTradeDataList = response.data;
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
    this.getAllClassOfTrade(pageNumber, this.pageSize, this.search);
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.getAllClassOfTrade(this.page, this.pageSize, this.search);
  }

  onSearch(event: Event): void {
    this.search = (event.target as HTMLInputElement).value;
    this.page = 1; // Reset to first page on search
    this.getAllClassOfTrade(this.page, this.pageSize, this.search);
  }

  editRecord(Id: string): void {
    this.openClassTrade(Id);        
  }

  deleteRecord(Id: string): void {
    this.confirmDialogService.confirm().then((result) => {
      if (result.isConfirmed) {
        this.classOfTradeservice.deleteClassOfTrade(Id).subscribe(
          (response) => {
            if (response.success) {
              this.toastr.success(response.message);
              this.getAllClassOfTrade(this.page, this.pageSize, '');
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

  openClassTrade(Id?: string): void {
    const modalRef = this.modalService.open(ClassOfTradeAddComponent, {
      backdrop: 'static',
      size: 'md',
      keyboard: false,
      centered: true,
    });
    modalRef.componentInstance.page = this.page;
    modalRef.componentInstance.pageSize = this.pageSize;
    modalRef.componentInstance.saveCompleted.subscribe(() => {
      this.getAllClassOfTrade(this.page, this.pageSize, this.search);
    });
    if (Id) {
      modalRef.componentInstance.Id = Id;
    }
  }
}
