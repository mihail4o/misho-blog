import {Component, HostListener, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {ArticleModel} from '../shared/article.model';
import {Observable, Subscription} from 'rxjs';
import {AppService} from '../app.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  articles: ArticleModel[];
  articleSubscription: Subscription;
  private exChangedSubscription: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  // article1 = {
  //   titleHeading: 'Add a blog to your Angular website using markdown files',
  //   titleDescription: 'Before going further: If you are looking to implement a blog, you are looking to share your stories but you are also most probably looking to make your website more SEO friendly. ',
  //   postKind: 'js-header-image',
  //   imageURL: 'https://res.cloudinary.com/balivo/image/upload/c_thumb,w_200,g_face/v1558058145/misho_pics/GranCanyon2018_Pano1_ubddt1.png',
  //   textBody:  '',
  //   postDate:  new Date(),
  //   isPublic: true
  // };


  constructor(private breakpointObserver: BreakpointObserver,
              private appService: AppService) {}

  ngOnInit(): void {
    this.articleSubscription = this.appService.articlesChanged
      .subscribe(articles => this.articles = articles);

    this.fetchArticles();

    // // Next attempt!
    //
    // this.exChangedSubscription = this.appService.finishedArticlesChanged
    //   .subscribe((articles: ArticleModel[]) => {
    //     this.articles = articles;
    //   });
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
    // this.exChangedSubscription.unsubscribe();
  }

  private fetchArticles() {
    this.appService.fetchAvailableArticles();
    console.log('articles[]: ' + this.articles);
  }


  onScrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

}
