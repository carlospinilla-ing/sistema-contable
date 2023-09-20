import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from './test';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  private testsUrl: string;
  
  constructor(private http: HttpClient) {
    this.testsUrl = 'http://localhost:8080/test';
  }

  public findAll(): Observable<Test[]> {
    return this.http.get<Test[]>(this.testsUrl);
  }
}
