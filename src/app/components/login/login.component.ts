import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { NgIf } from '@angular/common';
import { login } from '../../graphql.queries';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl<string | null>("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(100),
    ]),
    password: new FormControl<string | null>("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
    ]),
  })

  constructor(private apollo: Apollo, private router: Router){}

  ngOnInit(): void {

  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.apollo.query<any>({
        query: login,
        variables: {
          username: username,
          password: password
        }
      }).subscribe((response) => {
        const token = response?.data?.login?.token;
        if (token) {
          // Assuming you are storing the token in local storage or a similar approach
          localStorage.setItem('token', token);
          this.router.navigate(['/home']);
        } else {
          console.log('Login Failed');
          // Here you should also handle login failures, such as incorrect credentials
          // This might be a good place to show an error message to the user
        }
      }, (error) => {
        console.error('Login Error:', error);
        // Handle the error state here
        // You should display a user-friendly message
      });
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }


  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    })
  }

}
