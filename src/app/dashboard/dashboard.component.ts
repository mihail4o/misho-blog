import {Component, OnDestroy, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {ArticleModel} from '../shared/article.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  articles: ArticleModel[] = [{
    titleHeading: 'Add a blog to your Angular website using markdown files',
    titleDescription: 'Before going further: If you are looking to implement a blog, you are looking to share your stories but you are also most probably looking to make your website more SEO friendly. ',
    postKind: 'angular-header-image',
    imageURL: 'https://res.cloudinary.com/balivo/image/upload/c_fill,g_auto,f_auto,q_auto,w_150/v1558065477/misho_pics/Sundbyberg_-_Stockholm_July_25_2018_mucpbc.jpg',
  },
    {
      titleHeading: 'Add a blog to your Angular website using markdown files',
      titleDescription: 'Before going further: If you are looking to implement a blog, you are looking to share your stories but you are also most probably looking to make your website more SEO friendly. ',
      postKind: 'js-header-image',
      imageURL: 'https://res.cloudinary.com/balivo/image/upload/c_thumb,w_200,g_face/v1558058145/misho_pics/GranCanyon2018_Pano1_ubddt1.png',
    },
    {
      titleHeading: 'Add a blog to your Angular website using markdown files',
      titleDescription: 'Before going further: If you are looking to implement a blog, you are looking to share your stories but you are also most probably looking to make your website more SEO friendly. ',
      postKind: 'js-header-image',
      imageURL: 'https://res.cloudinary.com/balivo/image/upload/c_thumb,w_200,g_face/v1558058145/misho_pics/GranCanyon2018_Pano1_ubddt1.png',
    },
    {
      titleHeading: 'Add a blog to your Angular website using markdown files',
      titleDescription: 'Before going further: If you are looking to implement a blog, you are looking to share your stories but you are also most probably looking to make your website more SEO friendly. ',
      postKind: 'angular-header-image',
      imageURL: 'https://res.cloudinary.com/balivo/image/upload/c_thumb,w_200,g_face/v1558064954/misho_pics/lv_eifel_j23wlb.jpg',
    },
    {
      titleHeading: 'Add a blog to your Angular website using markdown files',
      titleDescription: 'Before going further: If you are looking to implement a blog, you are looking to share your stories but you are also most probably looking to make your website more SEO friendly. ',
      postKind: 'js-header-image',
      imageURL: 'https://res.cloudinary.com/balivo/image/upload/c_thumb,w_200,g_face/v1558133171/misho_pics/mmihov_d55lep.jpg',
    }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
