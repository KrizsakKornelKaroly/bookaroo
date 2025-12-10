import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePicker } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    InputTextModule, 
    FloatLabelModule, 
    DatePicker, 
    InputNumberModule, 
    ButtonModule,
    CarouselModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  

  responsiveOptions = [
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
    },
];

products = [
    {name: 'Szállás 1', image: 'https://placehold.co/300x150'},
    {name: 'Szállás 2', image: 'https://placehold.co/300x150'},
    {name: 'Szállás 3', image: 'https://placehold.co/300x150'},
    {name: 'Szállás 4', image: 'https://placehold.co/300x150'},
    {name: 'Szállás 5', image: 'https://placehold.co/300x150'},
    {name: 'Szállás 6', image: 'https://placehold.co/300x150'},
];

}

