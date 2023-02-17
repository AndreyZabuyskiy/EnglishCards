export class UserDto {
  email; id; isActivated;

  constructor(email, _id, isActivated) {
    this.email = email;
    this.id = _id;
    this.isActivated = isActivated;
  }
}