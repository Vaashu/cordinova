import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

      isLogin = false;
      roleAs: string;
      token: string;
    
      constructor(public router: Router) { }
    
      login(token:string,value: string) {
        this.isLogin = true;
        localStorage.setItem('TOKEN',token);
        localStorage.setItem('ROLE',value);
        return of({ success: this.isLogin, role: value });
      }
    
      logout() {
        this.isLogin = false;
        this.roleAs = '';
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    
      isLoggedIn() {
        const loggedIn = localStorage.getItem('TOKEN');
        if (loggedIn)
          this.isLogin = true;
        else
          this.isLogin = false;
        return this.isLogin;
      }
    
      getRole() {
        this.roleAs = localStorage.getItem('ROLE');
        return this.roleAs;
      }

      getToken() {
        this.token = localStorage.getItem('TOKEN');
        return this.token;
      }
}