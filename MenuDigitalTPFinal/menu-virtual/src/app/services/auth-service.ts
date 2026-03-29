import { inject, Injectable } from '@angular/core';
import { LoginData } from '../interfaces/auth'
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  token:string | { token: string; id: number; email: string; localName: string } | null = localStorage.getItem("token");
  //token: string | { token: string; id: number; email: string; localName: string } | null = null;
  userId = localStorage.getItem('userId');
  router = inject(Router);


  async login(loginData: LoginData){
    const res = await fetch('https://localhost:7227/api/authentication',
      {
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData),
      }
    )
    if(res.ok){
      const resText = await res.text()
      this.token = resText;
      localStorage.setItem('token', this.token);
      
      if (this.userId) {
        localStorage.setItem('userId', this.userId);
      }
      
    }
    return res.ok;
  }

  get isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }



  logout(){
    localStorage.removeItem("token");
    this.token = null;
    this.router.navigate(["/"]);
  }


}

