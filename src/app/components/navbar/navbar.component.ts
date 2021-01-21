import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  uri = 'http://127.0.0.1:8000/api';
  productCount:any;
  userDetails:any;
  public loggedIn:boolean;
  constructor(
    private http : HttpClient,
    private Auth : AuthService,
    private router : Router,
    private ts : TokenService,
  ) { }
  accessToken = this.ts.get();
  ngOnInit(): void {

    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+this.accessToken)
    .set('Access-Control-Allow-Origin', '*');

    this.http.get(`${this.uri}/product-count`, {'headers': headers }) 
    .subscribe(res => { 
      this.productCount = res;
    }); 

    this.http.get(`${this.uri}/user`, {'headers': headers }) 
    .subscribe(res => { 
      console.log(res);
      this.userDetails = res;
    }, (err: any) => {
      this.Auth.changeAuthStatus(false);
      this.ts.remove();
      console.log(err)
    });

    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(e){
    e.preventDefault();
    this.Auth.changeAuthStatus(false);
    this.ts.remove();
    this.router.navigateByUrl('/login');
  }

}
