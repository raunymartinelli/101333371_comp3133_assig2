import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { NgIf } from '@angular/common';
import { signup } from '../../graphql.queries';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signUpForm = new FormGroup({
    username: new FormControl<string | null>("", [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(100),
    ]),
    email: new FormControl<string | null>("", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string | null>("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
    ]),
  })


  constructor(private apollo: Apollo, private router: Router){}


  onRegister() {
    if (this.signUpForm.valid) {
      // Extract the form values
      const { username, email, password } = this.signUpForm.value;

      // Perform the mutation
      this.apollo.mutate({
        mutation: signup,
        variables: {
          username: username,
          email: email,
          password: password
        }
      }).subscribe({
        next: ({ data }) => {
          // If signup is successful, you might want to redirect to the login page
          this.router.navigate(['/login']);
          // Or you could directly log the user in and navigate to a dashboard, etc.
        },
        error: (error) => {
          // Log the complete error for debugging
          console.error('Error: ', error);

          // Handle GraphQL errors
          if (error && error.graphQLErrors && error.graphQLErrors.length > 0) {
            console.error('GraphQL Errors:', error.graphQLErrors);
          }

          // Handle network errors (error.status === 400, etc.)
          if (error.networkError) {
            console.error('Network Error:', error.networkError);
          }

          // If no specific errors are provided
          if (!error.networkError && (!error.graphQLErrors || error.graphQLErrors.length === 0)) {
            console.error('An unknown error occurred');
          }

          // Optionally show a user-friendly error message
        }
      });
    } else {
      // If the form is not valid, mark all form controls as touched to show validation errors
      this.markFormGroupTouched(this.signUpForm);
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

