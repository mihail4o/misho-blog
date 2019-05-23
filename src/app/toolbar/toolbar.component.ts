import {Component, EventEmitter, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Output() closeSidenav = new EventEmitter<void>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  onClose() {
    this.isHandset$.subscribe(result => {
    if (result) {
      this.closeSidenav.emit();
    }
    });
  }

  // constructURL(bsURL: string, width: string) {
  //   const url = bsURL.split('/');
  //   const insertIndex = url.indexOf('upload');
  //   const options = 'c_fill,g_auto,f_auto,q_auto,' + width;
  //   url.splice(insertIndex + 1, 0, options);
  //   return url.join('/');
  // }

}
