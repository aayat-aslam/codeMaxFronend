import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';

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
    this. headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+(this.ts.get()))
    .set('Access-Control-Allow-Origin', '*');
    if(this.ts.get()){
      this.http.post(`${this.uri}/add-product`, obj,{'headers': this.headers })
      .subscribe((res: any) => {
        this.changeProductCountStatus(res.length)
        this.router.navigateByUrl('/view-product');
      }, (err: any) => {
        // This error can be internal or invalid credentials
        // You need to customize this based on the error.status code
        // this.loading = false;
        // this.errors = true;
        console.log(err)
      });
    }else{
      this.router.navigateByUrl('/view-product');
    }
  }

  private count = new BehaviorSubject<any>(this.product())
  countProduct = this.count.asObservable();
  changeProductCountStatus(value: any){
    this.count.next(value);
  }
  
  product(){
    if(this.accessToken){
      this.http.get(`${this.uri}/product-count`, {'headers': this.headers }) 
      .subscribe(res => { 
        this.changeProductCountStatus(res);
        // return res;
      }); 
    }else{
      return '';
    }
  };
}
