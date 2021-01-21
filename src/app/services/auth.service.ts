import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = 'http://127.0.0.1:8000/api';
  constructor(
    private http : HttpClient,
    private ts : TokenService,
    private router : Router
  ) { }

  private loggedIn = new BehaviorSubject<boolean>(this.ts.loggedIn())
  authStatus = this.loggedIn.asObservable();
  changeAuthStatus(value: boolean){
    this.loggedIn.next(value);
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
      }, (err: any) => {
        // This error can be internal or invalid credentials
        // You need to customize this based on the error.status code
        // this.loading = false;
        // this.errors = true;
        console.log(err)
      });
  }

  handleResponse(data){
    this.ts.handleToken(data)
    this.changeAuthStatus(true);
    this.router.navigateByUrl('/view-product');
  }
}
