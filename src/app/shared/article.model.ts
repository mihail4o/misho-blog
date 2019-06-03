export interface ArticleModel {
  id?: string;
  titleHeading: string;
  titleDescription: string;
  textBody?: string;
  postKind: string;
  postDate?: Date;
  imageURL: string;
  isPublic?: boolean;
}
