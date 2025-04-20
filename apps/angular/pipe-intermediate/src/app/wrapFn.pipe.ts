import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapFn',
  standalone: true,
})
export class WrapFnPipe implements PipeTransform {
  transform<R, Args extends unknown[]>(
    func: (...args: Args) => R,
    ...args: Args
  ): R {
    return func(...args);
  }
}
