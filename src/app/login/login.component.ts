import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [MatIconModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public formLogin: FormGroup;

  constructor(private fb: FormBuilder){
    this.formLogin = this.fb.group({
      username: ['',[Validators.required]],
      password: ['', [Validators.required]]
    })
  }


  public onSubmitLogin(){
    console.log(this.formLogin.value);
  }
}
