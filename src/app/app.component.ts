import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DeleteComponent } from './components/delete/delete.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UpdateComponent } from './components/update/update.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, 
          SignupComponent, LoginComponent, DeleteComponent
          , NavbarComponent, UpdateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Employee Management';
}
