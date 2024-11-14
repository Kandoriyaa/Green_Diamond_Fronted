import { pageSize } from './../../utils/status-icon.constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, CustomerListResponse, CustomerResponse } from '../../models/Customer';
import { APIConstant } from '../../Constant/APIConstants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpService: HttpClient) { }

  getAllCustomer(page?: number, pageSize?: number, search?: string): Observable<CustomerListResponse> {
    let params = new HttpParams();

    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (pageSize !== undefined) {
      params = params.set('pageSize', pageSize.toString());
    }
    if (search) {
      params = params.set('search', search);
    }
    return this.httpService.get<CustomerListResponse>(`${APIConstant.customer.getAllCustomer}`, {params});
  }

  getCustomerById(id: number): Observable<CustomerResponse> {
    return this.httpService.get<CustomerResponse>(`${APIConstant.customer.getCustomerById}/${id}`)
  }

  saveCustomer(data: Customer): Observable<any> {
    return this.httpService.post(APIConstant.customer.saveCustomer, data)
  }

  deleteCustomer(id: number): Observable<any> {
    return this.httpService.delete(`${APIConstant.customer.deleteCustomer}/${id}`)
  }
}
