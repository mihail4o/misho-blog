import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {
  HtmlEditorService,
  ImageService,
  LinkService,
  MarkdownEditorService,
  QuickToolbarService,
  TableService,
  ToolbarService
} from '@syncfusion/ej2-angular-richtexteditor';
import {AppService} from '../../app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ArticleModel} from '../../shared/article.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarService, MarkdownEditorService]
})
export class EditComponent implements OnInit, OnDestroy {

  kindOf =
    [ {value: 'js-header-image', viewValue: 'JavaScript'},
      {value: 'angular-header-image', viewValue: 'Angular'},
      {value: 'css-header-image', viewValue: 'CSS'},
      {value: 'html-header-image', viewValue: 'HTML'},
      {value: 'nodejs-header-image', viewValue: 'NodeJS'},
      {value: 'npm-header-image', viewValue: 'npm'},
      {value: 'firebase-header-image', viewValue: 'Firebase'},
      {value: 'weheartit-header-image', viewValue: 'We Heart It!'},
    ];

  isPrivate = false;
  isMarkdown = true;
  previewOn = false;

  public value = `<p>RichTextEditor triggers events based on their actions.</p>`;

  public tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'SubScript', 'SuperScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink', 'CreateTable',
      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  };
  public quickTools: object = {
    image: [
      'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', '-', 'Display', 'AltText', 'Dimension']
  };

  article: ArticleModel = {
    titleHeading: '',
    titleDescription: '',
    textBody: '',
    postKind: '',
    imageURL: '',
    isPublic: false,
    isMarkdown: true
  };

  isUpdate = false;
  id: string;
  subscribtion: Subscription;

  constructor(
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscribtion = this.route.params
      .subscribe(params => {
        this.id = params['id'];
        if (params['id']) {
          this.appService.getArticle(params['id'])
            .subscribe(data => {
              this.article.titleHeading = data.titleHeading;
              this.article.titleDescription = data.titleDescription;
              this.article.textBody = data.textBody;
              this.article.imageURL = data.imageURL;
              this.article.postKind = data.postKind;
              this.article.isPublic = data.isPublic;
            });
          this.isUpdate = true;
          // this.post = './assets/blog/post/' + params['id'] + '.md';
        }
      });
  }

  onSubmit(form: NgForm) {
    this.article = {
      titleHeading: form.value.header,
      titleDescription: form.value.description,
      textBody: form.value.body,
      postKind: form.value.kind,
      imageURL: form.value.imageUrl,
      postDate: new Date(),
      isPublic: form.value.private,
    };
    if (this.isUpdate) {
      this.appService.updateArticle(this.id, this.article)
        .subscribe(res => {
          this.router.navigate(['/']);
        }, (err) => {
          console.log(err);
        });
      this.id = undefined;
    } else {
        this.appService.postArticles(this.article)
          .subscribe(res => {
            this.router.navigate(['/']);
          }, (err) => {
            console.log(err);
          });
    }
    // this.articleService.createArticle(article)
    //   .then(e => console.log('FB Add Success: ' + e))
    //   .catch(err => console.log('FB Error: ' + err));
    console.log(this.article);
    this.article = null;
  }

  ngOnDestroy(): void {
    if (this.subscribtion) {
      this.subscribtion.unsubscribe();
    }
  }

}
