import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private URL: string;
  
  constructor(private http: HttpClient) {
    this.URL = 'http://localhost:8080/account';
  }

  public create(data:Account):Observable<Account>{
    return this.http.post<Account>(this.URL,data);
  }

  public update(data:Account):Observable<Account>{
    return this.http.put<Account>(this.URL,data);
  }

  public delete(id:any):Observable<any>{
    return this.http.delete<any>(`${this.URL}/${id}`);
  }

  public findAll(): Observable<Account[]> {
    return this.http.get<Account[]>(this.URL);
  }

  public findAllByActive(): Observable<Account[]> {
    return this.http.get<Account[]>(this.URL+"/active");
  }
}
