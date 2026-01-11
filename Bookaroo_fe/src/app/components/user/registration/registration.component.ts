import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../interfaces/user';
import { MessageComponent } from "../../system/message/message.component";
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
const passwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink, MessageComponent, CommonModule, FormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  constructor(
    private api: ApiService,
    private message: MessageService,
    private router: Router
  ) { }

  acceptedTerms : boolean = false;
  newUser : User = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    role: ''
  };

  registration() {

    if (!this.acceptedTerms){
      this.message.show('danger', 'Hiba', 'Az ÁSZF elfogadása kötelező.');
    }


    if (!this.newUser.password.match(passwdRegExp)) {
      this.message.show('danger', 'Hiba', 'A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell legalább egy nagybetűt, egy kisbetűt és egy számot!');
      return;
    }

    this.api.registration('users', this.newUser).then(res => {
      if(res.status == 500){
        this.message.show('danger', 'Hiba', res.message);
        return;
      }

      this.newUser = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        role: ''
      };
      this.acceptedTerms = false;
      this.message.show('success', 'Siker', 'A regisztráció sikeres volt.');
      this.router.navigate(['/login']);
    })
  }
}
