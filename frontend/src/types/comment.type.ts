export type SendCommentType = {
  text: string,
  article: string,
}

export type AllCommentTypes = {
  allCount: number,
  comments: CommentType[],
}

export type CommentType = {
  id: string,
  text: string,
  date: string,
  likesCount: number,
  dislikesCount: number,
  user: {
    id: string,
    name: string,
  }
}

export type ActionsCommentsType = {
  comment: string,
  action: string,
}
