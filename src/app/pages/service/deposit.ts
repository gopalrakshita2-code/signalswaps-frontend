import { Injectable } from '@angular/core';
import { Apiservice } from '@/service/apiservice';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Deposit {  
  constructor(private apiService: Apiservice, private http: HttpClient) { }
  getDepositHistory(userEmail: string) {
    return this.apiService.post<any>(`deposit/list`, { userEmail });
  }
}


