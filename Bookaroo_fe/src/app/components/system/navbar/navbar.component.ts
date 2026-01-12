import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../services/message.service';
import { NavItem } from '../../../interfaces/navitem';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  environment = environment;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  menuItems: NavItem[] = [];

  constructor(
    public auth: AuthService,
    private router: Router,
    private message: MessageService
  ) { }


  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(res => {
      this.isLoggedIn = res;
      this.isAdmin = this.auth.isAdmin();
      this.loadMenuItems(this.isLoggedIn);
    });
    this.loadMenuItems(this.isLoggedIn);
  }


  logout() {
    this.auth.logout();
    this.message.show('success', 'Siker', 'Sikeres kijelentkezés!');
    this.router.navigate(['/login']);
  }

  loadMenuItems(isLoggedIn: boolean) {
    this.menuItems = [
      { label: "Főoldal", route: "/" },
      { label: "Szállások", route: "/accommodation-list" },
      ...(isLoggedIn) ? [
        { label: "Foglalásaim", route: "/mybookings" },
        ...(this.isAdmin) ? [
          { label: "Szállások kezelése", route: "/accommodation-management" },
          { label: "Foglalások kezelése", route: "/booking-management" }
        ] : [],
      ] : [],
      { label: "Naptár", route: "/calendar" }

    ];

  }
}
