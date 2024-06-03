import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgForEmpty } from './ngfor-empty.directive';

interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgFor, NgForEmpty],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons(); empty: emptyList">
      {{ person.name }}
    </div>

    <ng-template #emptyList>The list is empty !!</ng-template>

    <button (click)="addPerson()">add person</button>
    <button (click)="clearPersons()">clear</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons = signal<Person[]>([]);

  addPerson() {
    this.persons.update((persons) => [
      ...persons,
      { name: `New Person ${persons.length + 1}` },
    ]);

    console.log(this.persons());
  }

  clearPersons() {
    this.persons.set([]);
  }

  // persons: Person[] = [{ name: 'Alice' }, { name: 'Bob'}  ];
}
