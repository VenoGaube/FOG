export class Review {
  id_article:string;
  id_reviewer:string;
  author_comments:string;
  editor_comments:string;

  constructor(id_article?: string, id_reviewer?: string, author_comments?: string, editor_comments?: string) {
    this.id_article = id_article ?? "";
    this.id_reviewer = id_reviewer ?? "";
    this.author_comments = author_comments ?? "";
    this.editor_comments = editor_comments ?? "";
  }
}
