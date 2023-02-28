export class VisitedModuleDto {
  id; email; title; viewingTime

  constructor(_id, email, title, viewingTime) {
    this.id = _id;
    this.email = email;
    this.title = title;
    this.viewingTime = viewingTime;
  }
}