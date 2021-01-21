import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  uri = 'http://127.0.0.1:8000/api';
  constructor(
    private http : HttpClient,
    private router : Router,
    private ts : TokenService,
  ) { }
  accessToken = this.ts.get();
  headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+this.accessToken)
    .set('Access-Control-Allow-Origin', '*');

  addProduct(obj) {
    this.http.post(`${this.uri}/add-product`, obj,{'headers': this.headers })
    .subscribe((res: any) => {
      // this.handleResponse(res);
      console.log(res)
    }, (err: any) => {
      // This error can be internal or invalid credentials
      // You need to customize this based on the error.status code
      // this.loading = false;
      // this.errors = true;
      console.log(err)
    });
  }
}
