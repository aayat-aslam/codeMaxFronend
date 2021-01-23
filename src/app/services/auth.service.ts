import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers : any;
  uri = 'http://127.0.0.1:8000/api';
  constructor(
    private http : HttpClient,
    private ts : TokenService,
    private router : Router,
    private ps : ProductService
  ) { }

  private loggedIn = new BehaviorSubject<boolean>(this.ts.loggedIn())
  authStatus = this.loggedIn.asObservable();
  changeAuthStatus(value: boolean){
    this.loggedIn.next(value);
  }

  private userName = new BehaviorSubject<any>(this.userDetails())
  getUsername = this.userName.asObservable();
  changeUsername(value: any){
    this.userName.next(value);
  }

  private checkCredentials = new BehaviorSubject<boolean>(this.ts.loggedIn())
  credentialStatus = this.checkCredentials.asObservable();
  changeCredentialStatus(value: boolean){
    this.checkCredentials.next(value);
  }

  /**
   * This method will register new user
   * @param username
   * @param email
   * @param password
   */
  register(username, email, password) {
    const obj = {
      username,
      email,
      password
    };
    this.http.post(`${this.uri}/register`, obj)
    .subscribe((res: any) => {
      this.handleResponse(res);
    }, (err: any) => {
      // This error can be internal or invalid credentials
      // You need to customize this based on the error.status code
      // this.loading = false;
      // this.errors = true;
      console.log(err)
    });
  }

  /**
   * This method will authenticate an user
   * @param username
   * @param password
   */
  login(username, password) {
    const obj = {
      username,
      password
    };
    this.http.post(`${this.uri}/login`, obj)
      .subscribe((res: any) => {
        // Store the access token in the localstorage
        // localStorage.setItem('access_token', res.token);
        // localStorage.getItem('access_token');
        // localStorage.removeItem('access_token');
        // this.loading = false;
        // Navigate to home page
        // this.router.navigate(['/']);
        this.handleResponse(res);
        this.changeCredentialStatus(false);
        // this.ps.changeProductCountStatus(this.ps.productCount())
        // console.log(this.ps.productCount());
      }, (err: any) => {
        // This error can be internal or invalid credentials
        // You need to customize this based on the error.status code
        // this.loading = false;
        // this.errors = true;
        this.changeCredentialStatus(true);
        console.log(err);
      });
  }

  handleResponse(data){
    this.ts.handleToken(data)
    this.changeAuthStatus(true);
    this.headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer '+data.token)
    .set('Access-Control-Allow-Origin', '*');
    this.productCount();
    this.userDetails();
    console.log(this.ts.get());
    this.router.navigateByUrl('/view-product');
  }

  productCount(){
    if(this.headers){
      this.http.get(`${this.uri}/product-count`, {'headers': this.headers })
        .subscribe(res => {
          this.ps.changeProductCountStatus(res);
      }, (err: any) => {
        console.log(err)
      });
    }else{
      return '';
    }
  }

  userDetails(){
    if(this.headers){
      this.http.get(`${this.uri}/user`, {'headers': this.headers })
      .subscribe(res => {
        this.changeUsername(res.user.username);
      }, (err: any) => {
        this.changeAuthStatus(false);
        this.ts.remove();
        console.log(err)
      });
    }else{
      return '';
    }
  }
}
