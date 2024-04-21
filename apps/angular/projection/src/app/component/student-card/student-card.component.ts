import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card class="bg-light-green" [items]="students()" (add)="addStudent()">
      <img src="assets/img/student.webp" width="200px" />
      <ng-template [cardRow]="students()" let-student>
        <app-list-item (delete)="deleteStudent(student.id)">
          {{ student.firstName }} {{ student.lastName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, CardRowDirective],
})
export class StudentCardComponent implements OnInit {
  readonly #http = inject(FakeHttpService);
  readonly #store = inject(StudentStore);

  students = this.#store.students;

  ngOnInit(): void {
    this.#http.fetchStudents$.subscribe((s) => this.#store.addAll(s));
  }

  addStudent() {
    this.#store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.#store.deleteOne(id);
  }
}
