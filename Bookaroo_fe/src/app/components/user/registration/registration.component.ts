import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../interfaces/user';
import { MessageComponent } from "../../system/message/message.component";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink, MessageComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  constructor(
    private api: ApiService
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

    }
  }
}
