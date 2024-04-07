import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getAllEmployees} from '../../graphql.queries'
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { DeleteModalService } from '../../services/delete.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { AddComponent } from '../add/add.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterLink, NgIf, NgFor, RouterModule, AddComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  employees: any[] = [];

  constructor(private apollo: Apollo, private modalService: DeleteModalService){}

  ngOnInit(): void {
    this.fetchEmployees()
    
  }
  

  fetchEmployees(): void {
    this.apollo.watchQuery<any>({
      query: getAllEmployees
    }).valueChanges.subscribe((response) => {
      if (response.data && response.data.getAllEmployees) {
        this.employees = response.data.getAllEmployees;
      } else {
        console.error('Employee not found');
      }
    });
  }

  onDelete(employeeId: string){
    this.modalService.deleteModal(employeeId)
    .then(() => {
      window.location.reload()
    }).catch(error => {
      console.log(error)
    })
  }

}
