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
      numVisible: 1,
      numScroll: 5,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 5,
    },
  ];

  cities = [
    { name: 'Szállás 1', image: 'https://placehold.co/300x150' },
    { name: 'Szállás 2', image: 'https://placehold.co/300x150' },
    { name: 'Szállás 3', image: 'https://placehold.co/300x150' },
    { name: 'Szállás 4', image: 'https://placehold.co/300x150' },
    { name: 'Szállás 5', image: 'https://placehold.co/300x150' },
    { name: 'Szállás 6', image: 'https://placehold.co/300x150' },
  ];

  accomodations = [
    { name: 'Szállás 1', address: "A", capacity: "2", basePrice: "25000", image: 'https://placehold.co/300x325' },
    { name: 'Szállás 2', address: "B", capacity: "3", basePrice: "120000", image: 'https://placehold.co/300x325' },
    { name: 'Szállás 3', address: "C", capacity: "6", basePrice: "12000", image: 'https://placehold.co/300x325' },
    { name: 'Szállás 4', address: "D", capacity: "4", basePrice: "20000", image: 'https://placehold.co/300x325' },
    { name: 'Szállás 5', address: "E", capacity: "1", basePrice: "78000", image: 'https://placehold.co/300x325' },
    { name: 'Szállás 6', address: "F", capacity: "2", basePrice: "6800", image: 'https://placehold.co/300x325' },
  ];


}