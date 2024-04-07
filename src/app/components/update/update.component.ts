import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Apollo } from 'apollo-angular';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { findEmployee, updateEmployee } from '../../graphql.queries';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router'; // Make sure to import Router


@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NavbarComponent],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {

  @Input() employee!: any;
  @Input() employeeId!: string

  updateForm!: FormGroup

  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router){}



  ngOnInit(): void {
    // this.employeeId = this.route.snapshot.params['id'];
    this.route.params.subscribe(params => {
      this.employeeId = params['id'];
      console.log('Employee ID:', this.employeeId); // This should not be 'undefined'
      if (this.employeeId) {
        this.fetchEmployeeInfo();
      }
    });

    this.updateForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required)
    });
    // this.fetchEmployeeInfo()
  }

  onUpdate() {
    if (this.updateForm.valid && this.employeeId) {
      const updatedData = this.updateForm.value;
      this.apollo.mutate<any>({
        mutation: updateEmployee,
        variables: {
          eid: this.employeeId, // Changed from id to eid to match the GraphQL mutation variable
          firstname: updatedData.firstname, // Ensure these match the form control names
          lastname: updatedData.lastname,
          email: updatedData.email,
          gender: updatedData.gender,
          salary: parseFloat(updatedData.salary) // Make sure salary is a float as expected by GraphQL
        }
      }).subscribe(({data}) => {
        if (data.updateEmployee) {
          alert('Employee Updated');
          this.router.navigate(['/home'])
        } else {
          alert('Failed to update employee');
        }
      }, (error) => {
        // It's important to handle the error case as well
        console.error('Error updating employee:', error);
        alert('Error updating employee');
      });
    } else {
      this.markFormGroupTouched(this.updateForm);
      if (!this.employeeId) {
        alert('Employee ID is undefined');
      }
    }
  }


  fetchEmployeeInfo(): void {
    this.apollo.watchQuery<any>({
      query: findEmployee,
      variables: {
        id: this.employeeId
      }
    }).valueChanges.subscribe((response) => {
      if (response.data && response.data.getEmployeeById) {
        this.employee = response.data.getEmployeeById.employee;
        this.updateForm.patchValue(this.employee);
        console.log(this.employee)
      } else {
        console.log('Employee not found.');
      }
    });
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }


}
