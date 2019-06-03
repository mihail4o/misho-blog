import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();

  sub: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  onClose() {
    this.sub = this.isHandset$.subscribe(result => {
    if (result) {
      this.closeSidenav.emit();
    }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  // constructURL(bsURL: string, width: string) {
  //   const url = bsURL.split('/');
  //   const insertIndex = url.indexOf('upload');
  //   const options = 'c_fill,g_auto,f_auto,q_auto,' + width;
  //   url.splice(insertIndex + 1, 0, options);
  //   return url.join('/');
  // }

}
