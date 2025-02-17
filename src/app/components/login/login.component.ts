import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, this.validateDomain()]),
    password: new FormControl('', Validators.required)
  });

  login(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.controls.username.value!, this.loginForm.controls.password.value!);
      this.router.navigate(['/jugar']);
    }else{
      alert("Formulario inválido");
    }
  }

  validateDomain(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(!control){
        return null;
      }

      const mail = String(control.value);
      const index = mail.indexOf('@');
      
      if(index == -1 && mail != 'admin'){
        return { noDomain: "Debe ingresar un dominio" };
      }

      const domain = mail.substring(index);

      if (domain != '@tecnicatura.frc.utn.edu.ar' && index != -1){
        return { invalidDomain: "El dominio debe ser 'tecnicatura.frc.utn.edu.ar'" };
      }

      return null;
    }
  }

}
