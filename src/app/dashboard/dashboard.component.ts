import {Component, HostListener, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {map} from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {ArticleModel} from '../shared/article.model';
import {Observable, Subscription} from 'rxjs';
import {AppService} from '../app.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../shared/confirm-dialog/confirm-dialog.component';


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
  result = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private appService: AppService,
              private router: Router,
              public dialog: MatDialog) {}

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

  onUpdate(id: string) {
    console.log('Update id: ' + id);
  }

  onRemove(id: string) {
    const message = `Are you sure you want to remove this blog post?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed()

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (dialogResult) {
        // Conformed "true" - article deleted/removed!
        this.appService.deleteArticle(id).subscribe(result => {
          console.log('Removed id: ' + id);
        }, err => console.log('err' + err));
      } else {
        console.log('Not removed: ' + id);
      }
    });
  }
}
