import { Users } from '../schema/user.schema';

export class UserEntity {
  id: string;
  email: string;
  firstname: string;
  lastname: string;

  constructor(user: Users) {
    this.id = user._id.toString();
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
  }
}
