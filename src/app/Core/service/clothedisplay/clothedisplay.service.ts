import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIConstant } from '../../Constant/APIConstants';
import { Observable } from 'rxjs/internal/Observable';
import { ClotheDisplayListResponse, ClotheDisplayResponse } from '../../models/ClotheDisplay';

@Injectable({
  providedIn: 'root'
})
export class ClothedisplayService {

  constructor(private httpService: HttpClient) { }

  saveClotheDisplay(data: FormData): Observable<any> {debugger
    return this.httpService.post(APIConstant.clotheDisplay.saveClotheDisplay, data);
  }

  deleteClotheDisplaye(id: number): Observable<any> {
    return this.httpService.delete(`${APIConstant.clotheDisplay.deleteClotheDisplaye}/${id}`);
  }

  getClotheDisplayById(id: number): Observable<ClotheDisplayResponse> {
    return this.httpService.get<ClotheDisplayResponse>(`${APIConstant.clotheDisplay.getClotheDisplayById}/${id}`);
  }

  getAllClotheDisplay(page?: number, pageSize?: number, search?: string): Observable<ClotheDisplayListResponse> {
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
    return this.httpService.get<ClotheDisplayListResponse>(`${APIConstant.clotheDisplay.getAllClotheDisplay}`, { params });
  }
}
