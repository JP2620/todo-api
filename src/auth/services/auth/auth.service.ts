import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userService: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    const userDB = await this.userService.findUserByUsername(username);
    if (userDB && comparePasswords(password, userDB.password)) {
      console.log('User Validation Success!');
      return userDB;
    } else {
      console.log(
        'Validation Failed, wrong combination of' + 'username/password!',
      );
      return null;
    }
  }
}
