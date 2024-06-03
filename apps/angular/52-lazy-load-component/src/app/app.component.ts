import { Component } from '@angular/core';
import { PlaceholderComponent } from './placeholder.component';
import { TopComponent } from './top.component';

@Component({
  selector: 'app-root',
  imports: [PlaceholderComponent, TopComponent],
  standalone: true,
  template: `
    <div class="h-screen bg-gray-500">
      @defer (on interaction(buttonForTopComponent)) {
        <app-top />
      } @placeholder {
        <app-placeholder />
        <button
          #buttonForTopComponent
          class="rounded-sm border border-blue-500 bg-blue-300 p-2">
          Load Top Component
        </button>
      }
    </div>
  `,
})
export class AppComponent {}
