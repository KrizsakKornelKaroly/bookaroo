import { Component } from '@angular/core';
import { MessageComponent } from '../../system/message/message.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../interfaces/user';
import { ApiService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MessageComponent, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user: User = {
    email: '',
    password: '',
    name: '',
    role: ''
  };

  stayLoggedIn: boolean = false;


  constructor(
    private api: ApiService,
    private message: MessageService,
    private auth: AuthService,
    private router: Router
  ) { 
  }

  login() {
    this.api.login('users', this.user).then(res => {
      if (res.status == 500) {
        this.message.show('danger', 'Hiba', res.message);
        return;
      }
      if (this.stayLoggedIn) {
        this.auth.storeUser(JSON.stringify(res.data))
      }
      this.auth.login(JSON.stringify(res.data));
      this.message.show('success', 'Siker', 'Sikeres bejelentkezés!');
      this.router.navigate(['/']);
    });
  }
}
