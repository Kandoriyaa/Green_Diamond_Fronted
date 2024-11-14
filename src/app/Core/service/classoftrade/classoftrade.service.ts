import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassOfTrade, ClassOfTradeListResponse, ClassOfTradeResponse } from '../../models/ClassOfTrade';
import { APIConstant } from '../../Constant/APIConstants';

@Injectable({
  providedIn: 'root'
})
export class ClassoftradeService {

  constructor(private httpService: HttpClient) { }

  saveClassOfTrade(data: ClassOfTrade): Observable<any> {
    return this.httpService.post(APIConstant.classOfTrade.saveClassOfTrade, data);
  }

  deleteClassOfTrade(id: string): Observable<any> {
    return this.httpService.delete(`${APIConstant.classOfTrade.deleteClassOfTrade}/${id}`)
  }

  getClassOfTradeById(id: string): Observable<ClassOfTradeResponse> {
    return this.httpService.get<ClassOfTradeResponse>(`${APIConstant.classOfTrade.getClassOfTradeById}/${id}`)
  }

  getAllClassOfTrade(page?: number, pageSize?: number, search?: string): Observable<ClassOfTradeListResponse> {
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
    return this.httpService.get<ClassOfTradeListResponse>(`${APIConstant.classOfTrade.getAllClassOfTrade}`, {params});
  }

}
