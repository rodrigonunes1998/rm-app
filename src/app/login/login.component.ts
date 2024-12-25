import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatIconModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]
})
export class LoginComponent {
  public formLogin: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.formLogin = this.fb.group({
      username: ['',[Validators.required]],
      password: ['', [Validators.required]]
    })
  }


  public onSubmitLogin(){
    this.authService.login(this.formLogin.value.username,this.formLogin.value.password).subscribe((response: any)=>{
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.username);
      this.router.navigate(['/characters']);
    })
  }
}
