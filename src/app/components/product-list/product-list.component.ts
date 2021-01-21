import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  uri = 'http://127.0.0.1:8000/api';
  productList:any;
  constructor(
    private http : HttpClient,
    private ts : TokenService
  ) { }

  accessToken = this.ts.get();
  ngOnInit(): void {

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+this.accessToken)
    .set('Access-Control-Allow-Origin', '*');

    this.http.get(`${this.uri}/get-product`,{ 'headers': headers }) 
    .subscribe(res => { 
      this.productList = res;
      // console.log(this.productList);
    }); 
  
  }

}
