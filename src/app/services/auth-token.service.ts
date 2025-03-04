import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor() { }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  removeToken(): void {
    localStorage.removeItem("token");
  }

}
