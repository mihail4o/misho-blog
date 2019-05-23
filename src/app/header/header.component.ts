import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();

  imgUrlDsktp = 'https://res.cloudinary.com/balivo/image/upload/w_63,c_fill,ar_1:1,g_auto,r_max,f_png/v1558133659/misho_pics/mmihov_b9ldfe.jpg';
  imgUrlMbl = 'https://res.cloudinary.com/balivo/image/upload/w_53,c_fill,ar_1:1,g_auto,r_max,f_png/v1558133659/misho_pics/mmihov_b9ldfe.jpg';
  // imgUrlDsktp = 'https://res.cloudinary.com/balivo/image/upload/c_fill,g_auto,f_auto,q_auto,w_70/v1558058145/misho_pics/mmihov_b9ldfe';
  // imgUrlMbl = 'https://res.cloudinary.com/balivo/image/upload/c_fill,g_auto,f_auto,q_auto,w_60/v1558058145/misho_pics/mmihov_b9ldfe';
  // imgText = 'https://res.cloudinary.com/demo/image/fetch/f_png/w_800/l_text:Unkempt_250_bold:Water,fl_cutter,e_shadow/v1558058145/misho_pics/GranCanyon2018_Pano1_ubddt1';
  // imgText = 'https://res.cloudinary.com/balivo/image/fetch/f_png/w_400/l_text:Roboto_40_bold:Mihail Mihov Blog,fl_cutter,e_shadow/https://upload.wikimedia.org/wikipedia/commons/4/44/ZibadTirMahi.jpg';


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  ngOnInit() {
  }

}
