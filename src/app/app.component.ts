import { Component, inject, OnChanges, SimpleChanges } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './interfaces';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  private authService = inject(AuthService);
  private router = inject(Router);
  currentUser: User | null = null;

  title = 'Final170225';

  constructor(){ 
    if(localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    }
  }

  logout(){
    this.authService.logout();
    this.currentUser = null;
    this.router.navigate(['/login']);
  }
}
