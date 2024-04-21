import { Component, inject, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card class="bg-light-blue" [items]="cities()" (add)="addCity()">
      <img src="assets/img/city.png" width="200px" />
      <ng-template [cardRow]="cities()" let-city>
        <app-list-item (delete)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(205, 209, 228, 1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, CardRowDirective],
})
export class CityCardComponent implements OnInit {
  readonly #http = inject(FakeHttpService);
  readonly #store = inject(CityStore);

  cities = this.#store.cities;

  ngOnInit(): void {
    this.#http.fetchCities$.subscribe((c) => this.#store.addAll(c));
  }

  addCity() {
    this.#store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.#store.deleteOne(id);
  }
}
