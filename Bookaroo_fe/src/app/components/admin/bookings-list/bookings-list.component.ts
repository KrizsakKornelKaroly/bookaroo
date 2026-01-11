import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { Accommodation } from '../../../interfaces/accommodation';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../interfaces/user';
import { Bookings } from '../../../interfaces/bookings';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings-list',
  standalone: true,
  imports: [FormsModule, SelectModule, CommonModule],
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.scss']
})

export class BookingsListComponent implements OnInit {
  constructor(
      private api: ApiService
    ) {}
    
  accommodations: Accommodation[] = []
  users: User[] = []
  bookings: Bookings[] = []
  
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
    ];

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Los Angeles', code: 'LA' },
      { name: 'Chicago', code: 'CH' },
      { name: 'Houston', code: 'HO' },
      { name: 'Phoenix', code: 'PH' }
    ];

    this.loadAll();
  }

  // innentől lefelé ez mind copilot
  enrichedBookings: Array<Bookings & { user?: User; accommodation?: Accommodation; nights?: number }> = []; 

  async loadAll() {
    try {
      const [accRes, bookingsRes, usersRes] = await Promise.all([
        this.api.selectAll('accommodations'),
        this.api.selectAll('bookings'),
        this.api.selectAll('users')
      ]);

      this.accommodations = accRes.data;
      this.bookings = bookingsRes.data;
      this.users = usersRes.data;

      const usersById = new Map(this.users.map(u => [String(u.id), u]));
      const accById = new Map(this.accommodations.map(a => [String(a.id), a]));

      this.enrichedBookings = this.bookings.map(b => {
        const startStr = (b as any).startDate ?? (b as any).check_in ?? (b as any).checkIn ?? (b as any).from ?? null;
        const endStr = (b as any).endDate ?? (b as any).check_out ?? (b as any).checkOut ?? (b as any).to ?? null;
        let nights: number | null = null;

        if (startStr && endStr) {
          const s = new Date(startStr);
          const e = new Date(endStr);
          const startUTC = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate());
          const endUTC = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate());
          const DAY_MS = 24 * 60 * 60 * 1000;
          nights = Math.max(0, Math.floor((endUTC - startUTC) / DAY_MS));
        }

        const userKey = (b as any).user_id ?? (b as any).userId ?? (b as any).user ?? null;
        let userObj: User | undefined;
        if (userKey && typeof userKey === 'object') {
          userObj = userKey as User;
        } else if (userKey != null) {
          userObj = usersById.get(String(userKey));
        }

        const accKey = (b as any).accommodation_id ?? (b as any).accomodation_id ?? (b as any).accommodationId ?? (b as any).accomodationId ?? (b as any).accommodation ?? (b as any).accomodation ?? null;
        let accObj: Accommodation | undefined;
        if (accKey && typeof accKey === 'object') {
          accObj = accKey as Accommodation;
        } else if (accKey != null) {
          accObj = accById.get(String(accKey));
        }

        if (!accObj) {
          const nameKeys = ['accommodation_name','accommodationName','accommodation_title','accommodationTitle','acc_name','name','title','propertyName','accom_name','accommodation'];
          for (const key of nameKeys) {
            const val = (b as any)[key];
            if (val) {
              const match = this.accommodations.find(a => String((a.name ?? a.name ?? '')).toLowerCase() === String(val).toLowerCase());
              if (match) {
                accObj = match;
                console.info('Resolved accommodation for booking by name key', key, 'value', val);
                break;
              }
            }
          }
        }

        if (!accObj) {
          console.warn('Accommodation not found for booking', (b as any).id ?? b, 'key:', accKey, 'booking:', b);
        }

        return {
          ...b,
          user: userObj,
          accommodation: accObj,
          nights: nights ?? undefined
        };
      });
    } catch (err) {
      console.error('Failed to load bookings data', err);
    }
  }
}
