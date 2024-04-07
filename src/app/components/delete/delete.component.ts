import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Apollo } from 'apollo-angular';
import { deleteEmployee } from '../../graphql.queries';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [NavbarComponent, DeleteComponent],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css',
})
export class DeleteComponent {

  @Input() employeeId!: string

  constructor(private activeModal: NgbActiveModal, private apollo: Apollo) { }

  ngOnInit() {
  }

  accept() {
    this.apollo.mutate<any>({
      mutation: deleteEmployee,
      variables: {
        eid: this.employeeId
      }
    }).subscribe({
      next: (response) => {
        if(response.data && response.data.deleteEmployee) {
          this.activeModal.close(true);
        } else {
          console.log("Failed deleting employee", response);
        }
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
        if (error.graphQLErrors) {
          error.graphQLErrors.forEach((e:any) => console.error(e.message));
        }
        if (error.networkError) {
          console.error(error.networkError);
        }
      }
    });
  }

  decline() {
    this.activeModal.close(false);
  }

   dismiss() {
    this.activeModal.dismiss();
  }


}
