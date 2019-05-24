export interface ArticleModel {
  titleHeading: string;
  titleDescription: string;
  textBody?: string;
  postKind: string;
  postDate?: Date;
  imageURL: string;
  isPublic?: boolean;
}
