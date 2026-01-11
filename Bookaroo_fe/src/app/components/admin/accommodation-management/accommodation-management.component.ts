import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ApiService } from '../../../services/api.service';
import { Accommodation } from '../../../interfaces/accommodation';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-accommodation-management',
  standalone: true,
  imports: [FormsModule, SelectModule, CommonModule],
  templateUrl: './accommodation-management.component.html',
  styleUrl: './accommodation-management.component.scss',
})
export class AccommodationManagementComponent implements OnInit{
  constructor(
    private api: ApiService,
    private message: MessageService
  ) {}
  
  accommodations: Accommodation[] = []
  selectedAccommodation: Accommodation | null = null;

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

  edit(accommodation: Accommodation) {
    this.selectedAccommodation = { ...accommodation };
  }

  async save() {
    if (this.selectedAccommodation && this.selectedAccommodation.id && this.selectedAccommodation.id > 0) {
      const toUpdate = { ...this.selectedAccommodation };

      this.api.update('accommodations', toUpdate.id, toUpdate).then(res => {
        this.message.show('success', 'Siker', 'Szállás módosítva!');
        this.getAccommodations();
        this.selectedAccommodation = null;

        const modalEl = document.getElementById('editModal');
        if (modalEl) {
          const bs = (window as any).bootstrap;
          if (bs && bs.Modal) {
            const modalInstance = bs.Modal.getInstance(modalEl) || new bs.Modal(modalEl);
            modalInstance.hide();
          }
        }
      }).catch(() => {
        this.message.show('danger', 'Hiba', 'Nem sikerült módosítani a szállást.');
      });

      return;
    }

    const newAccommodation: Accommodation = {
      id: 0,
      name: 'Szállás',
      description: 'Leírás',
      country: 'Ország',
      city: 'Város',
      postal: 1,
      address: 'Cím',
      capacity: 1,
      basePrice: 1,
      active: true,
      createdAt: new Date()
    };

    this.api.insert('accommodations', newAccommodation).then(res => {
      this.getAccommodations();
      this.message.show('success', 'Siker', 'Új szállás hozzáadva!');

      const newModalEl = document.getElementById('newModal');
      if (newModalEl) {
        const bs = (window as any).bootstrap;
        if (bs && bs.Modal) {
          const modalInstance = bs.Modal.getInstance(newModalEl) || new bs.Modal(newModalEl);
          modalInstance.hide();
        }
      }
    }).catch(() => {
      this.message.show('danger', 'Hiba', 'Nem sikerült hozzáadni az új szállást.');
    });
  }
}