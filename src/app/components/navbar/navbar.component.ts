import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  uri = 'http://127.0.0.1:8000/api';
  public productCount:any;
  public getHeaders:any;
  public userDetails:any;
  public loggedIn:boolean;
  constructor(
    private http : HttpClient,
    private Auth : AuthService,
    private router : Router,
    private ts : TokenService,
    private ps : ProductService
  ) { }
  
  accessToken = this.ts.get();
  ngOnInit(): void {

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+this.accessToken)
    .set('Access-Control-Allow-Origin', '*');

    // this.http.get(`${this.uri}/product-count`, {'headers': headers }) 
    // .subscribe(res => { 
    //   this.productCount = res;
    // }); 

    if(this.accessToken){
      this.http.get(`${this.uri}/user`, {'headers': headers }) 
      .subscribe(res => { 
        this.userDetails = res.user.username;
      }, (err: any) => {
        this.Auth.changeAuthStatus(false);
        this.ts.remove();
      });
    }

    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    this.Auth.getUsername.subscribe(value => this.userDetails = value);
    this.ps.countProduct.subscribe(value => this.productCount = value);
  }

  logout(e){
    e.preventDefault();
    this.Auth.changeAuthStatus(false);
    this.Auth.changeCredentialStatus(false);
    this.ps.changeProductCountStatus('');
    this.ts.remove();
    this.router.navigateByUrl('/login');
  }

}
