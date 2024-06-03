import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngFor]',
  standalone: true,
})
class NgForEmptyDirective<T> implements DoCheck {
  ngForOf = input<T[]>();
  ngForEmpty = input.required<TemplateRef<unknown>>();

  private readonly vcr = inject(ViewContainerRef);
  private ref?: EmbeddedViewRef<unknown>;

  ngDoCheck(): void {
    console.log('called');
    this.ref && this.ref.destroy();

    if (!this.ngForOf() || this.ngForOf()?.length === 0) {
      this.ref = this.vcr.createEmbeddedView(this.ngForEmpty());
    } else this.ref?.destroy();
  }
}

export { NgForEmptyDirective as NgForEmpty };
