import { Component, Input, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AddEmployee } from '../../graphql.queries';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import {getAllEmployees} from '../../graphql.queries';


@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, NavbarComponent],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {

  @Input() title!: string;

  addEmployeeForm!: FormGroup

  constructor(private apollo: Apollo, private router: Router){}

  ngOnInit(): void {
    this.addEmployeeForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required)
    });
  }

  addEmployee() {
    if (this.addEmployeeForm.valid) {
      const formValues = this.addEmployeeForm.value;
      this.apollo.mutate({
        mutation: AddEmployee,
        variables: {
          firstname: formValues.firstname,
          lastname: formValues.lastname,
          email: formValues.email,
          gender: formValues.gender,
          salary: parseFloat(formValues.salary),
        },
        refetchQueries: [{query: getAllEmployees}],
      }).subscribe({
        next: ({ data }) => {
          this.addEmployeeForm.reset();
          alert('Employee added with success!');
          this.router.navigateByUrl('/home').then(() => {
            // Navigation success callback, maybe refresh the data
          });
        },
        error: (error) => {
          console.error('Error adding employee:', error);
          alert('Error adding employee');
          // additional error handling here
        },
      });
    } else {
      this.formGroupTouched(this.addEmployeeForm);
    }
  }

  private formGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.formGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
