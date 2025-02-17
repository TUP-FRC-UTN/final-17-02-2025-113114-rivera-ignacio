import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  constructor() { }

  getUser(username: string, password: string): Observable<User[]>{
    return this.http.get<User[]>(environment.apiAuth, {params: {username, password}})
  }

  login(username: string, password: string){
    this.getUser(username, password).subscribe({
      next: (user: User[]) => {
        localStorage.setItem('currentUser', JSON.stringify(user[0]));
      }, 
      error: () => {
        alert("Credenciales inválidas...");
      }
    })
  }

  logout(){
    localStorage.removeItem('currentUser');
  }

  isLogedIn(): boolean{
    if(localStorage.getItem('currentUser')){
      return true
    }
    return false;
  }
}
