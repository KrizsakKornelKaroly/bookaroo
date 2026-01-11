import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  environment = environment;


  constructor(
    public auth: AuthService,
    private router: Router,
    private message: MessageService
  ) { }

  logout() {
    this.auth.logout();
    this.message.show('success', 'Siker', 'Sikeres kijelentkezés!');
    this.router.navigate(['/login']);
  }

}
