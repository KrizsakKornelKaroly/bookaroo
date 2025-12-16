import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

interface City {
  name: string;
  code: string;
}


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FormsModule, SelectModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {

  cities: City[] | undefined;

  selectedCity: City | undefined;


  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', function () {
      const calendarEl = document.getElementById('calendar')
      const calendar = new Calendar(calendarEl!, {
        plugins: [dayGridPlugin, bootstrap5Plugin],
        themeSystem: 'bootstrap5',
        initialView: 'dayGridMonth',
        locale: 'hu',
        buttonText: {
          today: 'Ma',
          month: 'Hónap',
          week: 'Hét',
          day: 'Nap',
          list: 'Lista'
        },
        firstDay: 1,
        headerToolbar: {
          left: 'prev,today,next',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }
      })
      calendar.render()
    });


    this.cities = [
            { name: 'Magyarország', code: 'HU' },
            { name: 'Olaszország', code: 'IT' },
            { name: 'Egyesült Királyság', code: 'GB' },
            { name: 'Törökország', code: 'TR' },
            { name: 'Franciaország', code: 'FR' }
        ];
  }


}
