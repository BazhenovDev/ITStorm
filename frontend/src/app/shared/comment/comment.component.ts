import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {ActionsCommentsType, CommentType} from "../../../types/comment.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {CommentsService} from "../services/comments.service";
import {DISLIKE_REACTION, LIKE_REACTION, VIOLATE_REACTION} from "../../../constants/reactions.constants";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
  selector: 'comment-component',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {

  constructor(private commentsService: CommentsService,
              private _snackBar: MatSnackBar,) {
  }

  @Input() comment!: CommentType;
  @Input() userReaction?: ActionsCommentsType;

  likeReactionKey: string = LIKE_REACTION;
  dislikeReactionKey: string = DISLIKE_REACTION;
  violateReactionKey: string = VIOLATE_REACTION;

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
  }

  createDate(date: string): string {
    return new Date(date).toLocaleString('ru-RU', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).replace(',', '');
  }

  clickOnReaction(reaction: string) {

    if (this.userReaction) {
      if (this.userReaction.action === this.likeReactionKey && reaction === this.dislikeReactionKey) {
        this.comment.likesCount -= 1;
        this.comment.dislikesCount += 1;
      } else if (this.userReaction.action === this.dislikeReactionKey && reaction === this.likeReactionKey) {
        this.comment.dislikesCount -= 1;
        this.comment.likesCount += 1;
      } else if (this.userReaction.action === this.likeReactionKey && reaction === this.likeReactionKey) {
        this.comment.likesCount -= 1;
      } else if (this.userReaction.action === this.dislikeReactionKey && reaction === this.dislikeReactionKey) {
        this.comment.dislikesCount -= 1;
      }
    } else if (reaction === this.dislikeReactionKey) {
      this.comment.dislikesCount += 1;
    } else if (reaction === this.likeReactionKey) {
      this.comment.likesCount += 1;
    }

    const updateReactSub = this.commentsService.updateReaction(this.comment.id, {action: reaction})
      .subscribe({
        next: (response: DefaultResponseType) => {
          if (reaction === VIOLATE_REACTION && !response.error) {
            this._snackBar.open('Жалоба отправлена', 'ОК');
          } else if (this.userReaction?.action === reaction) {
            this._snackBar.open('Реакция удалена', 'ОК');
          } else if ((reaction === LIKE_REACTION || reaction === DISLIKE_REACTION) && !response.error) {
            this._snackBar.open('Ваш голос учтён', 'ОК');
          }
          if (response && !response.error) {
            this.commentsService.getActionForComments(this.comment.id)
              .subscribe((actionComments: DefaultResponseType | ActionsCommentsType[]) => {
                this.userReaction = (actionComments as ActionsCommentsType[])[0];
              })
          }
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message.toLowerCase('это действие уже применено к комментарию')) {
            this._snackBar.open('Жалоба уже отправлена', 'ОК');
          } else if (errorResponse.error && errorResponse.error.message) {
            this._snackBar.open(errorResponse.error.message);
          }
        }
      });

    this.subscription.add(updateReactSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
