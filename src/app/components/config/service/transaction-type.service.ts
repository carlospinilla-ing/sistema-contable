import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionType } from '../models/transaction-type';

@Injectable({
  providedIn: 'root'
})
export class TransactionTypeService {


  private URL: string;
  
  constructor(private http: HttpClient) {
    this.URL = 'http://localhost:8080/transaction-type';
  }

  public create(data:TransactionType):Observable<TransactionType>{
    return this.http.post<TransactionType>(this.URL,data);
  }

  public update(data:TransactionType):Observable<TransactionType>{
    return this.http.put<TransactionType>(this.URL,data);
  }

  public delete(id:any):Observable<any>{
    return this.http.delete<any>(`${this.URL}/${id}`);
  }

  public findAll(): Observable<TransactionType[]> {
    return this.http.get<TransactionType[]>(this.URL);
  }

  public findAllByActive(): Observable<TransactionType[]> {
    return this.http.get<TransactionType[]>(this.URL+"/active");
  }

  public findAllTransactionTypes(): Observable<String[]> {
    return this.http.get<String[]>(this.URL+"/get-types");
  }
}
