import {CommentType} from "./comment.type";

export type ArticleCardType = {
  id: string,
  title: string,
  description: string,
  image: string,
  date: string,
  category: string,
  url: string,
}

export type ArticlesType = {
  count: number,
  pages: number,
  items: ArticleCardType[],
}

export type ArticleType = {
  text: string,
  comments: CommentType[],
  commentsCount: number,
  id: string,
  title: string,
  description: string,
  image: string,
  date: string,
  category: string,
  url: string,
}
