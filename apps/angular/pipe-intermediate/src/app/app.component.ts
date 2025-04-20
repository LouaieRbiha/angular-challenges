import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { WrapFnPipe } from './wrapFn.pipe';

@Component({
  standalone: true,
  imports: [NgFor, WrapFnPipe],
  selector: 'app-root',
  template: `
    <ng-container>
      <div
        *ngFor="let person of persons; let index = index; let isFirst = first">
        {{ getSomething.bind(this) | wrapFn: person.name : index }}
        {{ isAllowed | wrapFn: person.age : isFirst }}
        {{ boundComputeHeavy | wrapFn: 10 }}
        <br />
      </div>
      <button (click)="callFn()">CD</button>
    </ng-container>
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];

  boundComputeHeavy = this.computeHeavy.bind(this);

  showName(name: string, index: number) {
    // very heavy computation
    return `${name} - ${index}`;
  }

  getSomething(name: string, index: number) {
    return this.showName(name, index);
  }

  isAllowed(age: number, isFirst: boolean) {
    if (isFirst) {
      return 'always allowed';
    } else {
      return age > 25 ? 'allowed' : 'declined';
    }
  }

  computeHeavy(n: number): number {
    console.log('called');
    if (n <= 1) return n;
    return this.computeHeavy(n - 1) + this.computeHeavy(n - 2);
  }

  callFn() {
    console.log('click event called');
  }
}
