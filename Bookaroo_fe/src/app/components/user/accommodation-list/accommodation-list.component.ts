import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-accommodation-list',
  standalone: true,
  imports: [FormsModule, SelectModule],
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.scss']
})
export class AccommodationListComponent implements OnInit {
  countries: any[] | undefined;
  cities: any[] | undefined;

  selectedCountry: string | undefined;
  selectedCity: string | undefined; // added

  ngOnInit() {

    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ]

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Los Angeles', code: 'LA' },
      { name: 'Chicago', code: 'CH' },
      { name: 'Houston', code: 'HO' },
      { name: 'Phoenix', code: 'PH' }
    ]
  }
}
