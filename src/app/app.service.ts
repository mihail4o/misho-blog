import { Injectable } from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {ArticleModel} from './shared/article.model';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  articleChanged = new Subject<ArticleModel>();
  articlesChanged = new Subject<ArticleModel[]>();
  finishedArticlesChanged = new Subject<ArticleModel[]>();
  private runningArticle: ArticleModel;
  private availableArticles: ArticleModel[] = [];
  private fbSubs: Subscription[] = [];

  ref = firebase.firestore().collection('blogPosts');

  constructor(private db: AngularFirestore) { }
  // constructor() { }

  getArticles(): Observable<any> {
    return new Observable((observer) => {
      this.ref.onSnapshot((querySnapshot) => {
        const articles = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          articles.push({
            id: doc.id,
            titleHeading: data.titleHeading,
            titleDescription: data.titleDescription,
            textBody:  data.textBody,
            postKind:  data.postKind,
            postDate:  data.postDate,
            imageURL:  data.imageURL,
            isPublic: data.isPublic
          });
        });
        observer.next(articles);
      });
    });
  }

  getArticle(id: string): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).get().then((doc) => {
        const data = doc.data();
        observer.next({
          id: doc.id,
          titleHeading: data.titleHeading,
          titleDescription: data.titleDescription,
          textBody:  data.textBody,
          postKind:  data.postKind,
          postDate:  data.postDate,
          imageURL:  data.imageURL,
          isPublic: data.isPublic
        });
      });
    });
  }

  postArticles(data): Observable<any> {
    return new Observable((observer) => {
      this.ref.add(data).then((doc) => {
        observer.next({
          key: doc.id,
        });
      });
    });
  }

  updateArticle(id: string, data): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).set(data).then(() => {
        observer.next();
      });
    });
  }

  deleteArticle(id: string): Observable<{}> {
    return new Observable((observer) => {
      this.ref.doc(id).delete().then(() => {
        observer.next();
      });
    });
  }

  fetchAvailableArticles() {
    this.fbSubs.push(this.db
      .collection('blogPosts')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            titleHeading: doc.payload.doc.data()['titleHeading'],
            titleDescription: doc.payload.doc.data()['titleDescription'],
            textBody:  doc.payload.doc.data()['textBody'],
            postKind:  doc.payload.doc.data()['postKind'],
            postDate:  doc.payload.doc.data()['postDate'],
            imageURL:  doc.payload.doc.data()['imageURL'],
            isPublic: doc.payload.doc.data()['isPublic']
          };
        });
      }))
      .subscribe((articles: ArticleModel[]) => {
        this.availableArticles = articles;
        this.articlesChanged.next([...this.availableArticles]);

      }, error => {
        console.log('error:' + error);
        this.articlesChanged.next(null);
      }));
  }

  startArticle(selectedId: string) {
    // How to works with single field in Firebase ( named Document there )
    // this.db.doc('availableArticle/' + selectedId)
    //   .update({lastSelected: new Date()});
    this.runningArticle = this.availableArticles.find(
      ar => ar.id === selectedId);
    this.articleChanged.next({...this.runningArticle});
  }

  fetchCompletedArticles() {
    this.fbSubs.push(this.db.collection('blogPosts')
      .valueChanges()
      .subscribe((articles: ArticleModel[]) => {
        this.finishedArticlesChanged.next(articles);
    }));
  }

  addArticle(article: ArticleModel) {
    this.db.collection('blogPosts').add(article);
  }

  cancelSubscriptions() {
    this.fbSubs.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
