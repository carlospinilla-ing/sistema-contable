import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private URL: string;
  
  constructor(private http: HttpClient) {
    this.URL = 'http://localhost:8080/transaction';
  }

  public create(data:Transaction):Observable<Transaction>{
    return this.http.post<Transaction>(this.URL,data);
  }

  public update(data:Transaction):Observable<Transaction>{
    return this.http.put<Transaction>(this.URL,data);
  }

  public delete(id:any):Observable<any>{
    return this.http.delete<any>(`${this.URL}/${id}`);
  }

  public findAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.URL);
  }

  public findAllTransactionTypes(): Observable<String[]> {
    return this.http.get<String[]>(this.URL+"/get-types");
  }
}
