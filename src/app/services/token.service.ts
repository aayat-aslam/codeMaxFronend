import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handleToken(data){
    this.set(data.token);
    console.log(this.isValid(data.token));
    return this.isValid(data.token);
  }

  set(token){
    localStorage.setItem('access_token', token);
  }

  get(){
    return localStorage.getItem('access_token');
  }

  remove(){
    localStorage.removeItem('access_token');
  }

  isValid(data){
    const access_token = this.get();
    if(access_token){
      const payload = this.payload(access_token); 
      return (data===access_token) ? true : false;
    }
    else{
      return false;
    }
  }

  loggedIn(){
    if(this.get()){
      return true;
    }else{
      return false;
    }
  }

  payload(access_token){
    const payload = access_token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload){
    return JSON.parse(atob(payload));
  }
}
