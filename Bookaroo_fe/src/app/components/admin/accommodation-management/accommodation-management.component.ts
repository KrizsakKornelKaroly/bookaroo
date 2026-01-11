import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ApiService } from '../../../services/api.service';
import { Accommodation } from '../../../interfaces/accommodation';

@Component({
  selector: 'app-accommodation-management',
  standalone: true,
  imports: [FormsModule, SelectModule, CommonModule],
  templateUrl: './accommodation-management.component.html',
  styleUrl: './accommodation-management.component.scss',
})
export class AccommodationManagementComponent implements OnInit{
  constructor(
    private api: ApiService
  ) {}
  
  accommodations: Accommodation[] = []

  countries: any[] | undefined;
  cities: any[] | undefined;

  selectedCountry: string | undefined;
  selectedCity: string | undefined;

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

    this.getAccommodations()
  }

  getAccommodations() {
    this.api.selectAll('accommodations').then(res => {
      this.accommodations = res.data
      console.log(this.accommodations)
    })
  }
}
