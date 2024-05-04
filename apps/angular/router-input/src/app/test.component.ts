import { Component, input } from '@angular/core';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [],
  template: `
    <div>TestId: {{ testId() }}</div>
    <div>Permission: {{ permission() }}</div>
    <div>User: {{ user() }}</div>
  `,
})
export default class TestComponent {
  readonly testId = input<string>();
  readonly permission = input<string>();
  readonly user = input<string>();
}
