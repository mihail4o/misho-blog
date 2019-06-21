import {Component, HostListener, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {ArticleModel} from '../shared/article.model';
import {Observable, Subscription} from 'rxjs';
import {AppService} from '../app.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  articles: ArticleModel[];
  articleSubscription: Subscription;
  subscr: Subscription;
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
              private appService: AppService,
              private router: Router) {}

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


  private fetchArticles() {
    this.appService.getArticles()
      .subscribe(data => {
        this.articles = data;
      });
    // this.appService.fetchAvailableArticles();
  }


  onScrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  onClickCard(id: string) {
    this.subscr = this.appService.getArticle(id)
      .subscribe(data => {
        this.router.navigate(['/blog/post/' + data.id]);
      });
  }

  ngOnDestroy(): void {
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
    if (this.subscr) {
      this.subscr.unsubscribe();
    }
    // this.exChangedSubscription.unsubscribe();
  }
}
