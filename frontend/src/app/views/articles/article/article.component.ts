import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticlesService} from "../../../shared/services/articles.service";
import {ArticleCardType, ArticleType} from "../../../../types/articles.type";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../../core/auth/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {CommentsService} from "../../../shared/services/comments.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {ActionsCommentsType, AllCommentTypes} from "../../../../types/comment.type";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'article-component',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  article: ArticleType | null = null;
  relatedArticles: ArticleCardType[] = [];
  staticPath: string = environment.staticApi;
  comments: AllCommentTypes = {
    allCount: 0,
    comments: [],
  };

  currentPath: string = '';
  encodePath: string = '';
  encodeTitle: string = '';
  encodeImage: string = '';

  vkShare: string = '';
  facebookShare: string = '';

  showLoader: boolean = false;
  isLoggedIn: boolean = false;
  countCommentsOnPage: number = 0;
  currentCommentsLength: number = 0;
  userReactions: ActionsCommentsType[] = [];
  showLoadMoreCommentsButton: boolean = true;
  userReactionsIsLoaded: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private articlesService: ArticlesService,
              private authService: AuthService,
              private fb: FormBuilder,
              private commentsService: CommentsService,
              private titleService: Title) {
  }

  private subscription: Subscription = new Subscription();

  commentForm = this.fb.group({
    comment: ['', [Validators.required]],
  })

  ngOnInit(): void {

    this.isLoggedIn = this.authService.getIsLogged();

    const getIsLoggedSub = this.authService.isLogged$
      .subscribe((isLoggedIn: boolean) => this.isLoggedIn = isLoggedIn);
    this.subscription.add(getIsLoggedSub);

    const routerParamsSub = this.activatedRoute.params.subscribe(params => {
      if (params && params['url']) {
       const getArticleSub = this.articlesService.getArticle(params['url'])
          .subscribe((articleResponse: ArticleType) => {
            this.article = articleResponse;
            this.getAllUserActions(articleResponse.id);
            this.comments = {
              allCount: articleResponse.commentsCount,
              comments: articleResponse.comments
            }
            this.titleService.setTitle(`ITStorm | Статья: ${articleResponse.title}`);
            this.currentCommentsLength = articleResponse.comments.length;

            this.currentPath = window.location.href;

            this.encodePath = encodeURIComponent(this.currentPath);
            this.encodeImage = encodeURIComponent(this.staticPath + articleResponse.image);
            this.encodeTitle = encodeURIComponent(articleResponse.title);

            this.vkShare = `https://vk.com/share.php?url=${this.currentPath}&title=${this.encodeTitle}&image=${this.encodeImage}`;
            this.facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${this.currentPath}`;

          });

       this.subscription.add(getArticleSub);

        const getRelatedArticlesSub = this.articlesService.getRelatedArticles(params['url'])
          .subscribe((relatedArticlesResponse: ArticleCardType[]) => {
            this.relatedArticles = relatedArticlesResponse;
          })
        this.subscription.add(getRelatedArticlesSub);
      }
    })

    this.subscription.add(routerParamsSub);

  }

  sendForm() {
    if (this.commentForm.invalid) {
      this.commentForm.markAsTouched();
      return;
    }
   const sendCommentSub = this.commentsService.sendComment({
      text: this.commentForm.value.comment || '',
      article: this.article!.id
    })
      .subscribe((response: DefaultResponseType) => {
        if (response && !response.error) {
          this.articlesService.getArticle(this.article!.url)
            .subscribe((articleResponse: ArticleType) => {
              this.comments = {
                allCount: articleResponse.commentsCount,
                comments: articleResponse.comments
              }
              this.currentCommentsLength = articleResponse.comments.length;
            });
          this.commentForm.reset();
        }
      });

    this.subscription.add(sendCommentSub);
  }

  loadMoreComments() {
    this.showLoader = true;
    const getCommentsSub = this.commentsService.getComments({offset: this.countCommentsOnPage, article: this.article!.id.toString()})
      .subscribe((response: AllCommentTypes) => {

        if (response.comments && response.comments.length > 0) {
          if (this.countCommentsOnPage === 0) {
            this.comments.comments = response.comments;
          } else {
            for (let comment of response.comments) {
              this.comments.comments.push(comment);
            }
          }
        }
        this.showLoader = false;

        this.countCommentsOnPage += response.comments.length;
        this.currentCommentsLength = this.comments.comments.length;

        if (+this.comments.allCount === +this.currentCommentsLength) {
          this.showLoadMoreCommentsButton = false;
        }

      })

    this.subscription.add(getCommentsSub);
  }

  getAllUserActions(id: string) {
      if (this.isLoggedIn) {
        const getAllActionForCommentsSub = this.commentsService.getAllActionForComments(id)
          .subscribe((response: ActionsCommentsType[] | DefaultResponseType) => {
            this.userReactions = response as ActionsCommentsType[];
            this.userReactionsIsLoaded = true;
          })
        this.subscription.add(getAllActionForCommentsSub);
      } else {
        this.userReactionsIsLoaded = true;
      }
  }


  getReactionForComment(commentId: string) {
    return this.userReactions.find(reaction => reaction.comment === commentId);
  }

  shareInInstagram() {
    const href: string = window.location.href;
    navigator.clipboard.writeText(href)
      .then(() => {
        window.open('https://instagram.com/', '_blank');
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
