import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  uri = 'http://127.0.0.1:8000/api';
  constructor(
    private http : HttpClient,
    private router : Router
    ) { }

  /**
   * This method will register new user
   * @param username 
   * @param email 
   * @param password 
   */
  contactUs(obj) {
    console.log(obj);
    this.http.post(`${this.uri}/contact-us`, obj)
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
