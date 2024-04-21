import { Injectable, signal } from '@angular/core';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  teachers = signal<Teacher[]>([]);

  addAll(teachers: Teacher[]) {
    this.teachers.set(teachers);
  }

  addOne(teacher: Teacher) {
    this.teachers.update((currentValue) => [...currentValue, teacher]);
  }

  deleteOne(id: number) {
    this.teachers.update((currentValue) =>
      currentValue.filter((t) => t.id !== id),
    );
  }
}
