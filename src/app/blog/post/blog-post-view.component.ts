import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-blog-post-view',
  templateUrl: './blog-post-view.component.html',
  styleUrls: ['./blog-post-view.component.css']
})
export class BlogPostViewComponent implements OnInit, OnDestroy {

  private sub: Subscription;

  // post: Observable<any>;
  post: string;

  constructor(private route: ActivatedRoute,
              private appService: AppService) { }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        this.appService.getArticle(params['id'])
          .subscribe(data => {
            this.post = data.textBody;
          });
        // this.post = './assets/blog/post/' + params['id'] + '.md';
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
