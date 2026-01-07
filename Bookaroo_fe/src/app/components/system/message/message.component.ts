import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../../interfaces/message';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  message: Message | null = null;
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    /*
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')

    if (toastTrigger) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
      })
    }*/

    this.messageService.message$.subscribe(msg => {
      this.message = msg;

      switch (this.message?.severity) {
        case 'info':
          this.message.icon = 'bi-info-circle';
          break;
        case 'success':
          this.message.icon = 'bi-check-circle';
          break;
        case 'warning':
          this.message.icon = 'bi-exclamation-triangle';
          break;
        case 'danger':
          this.message.icon = 'bi-x-circle';
          break;
      }
    });


  }
}
