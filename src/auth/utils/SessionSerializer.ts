import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/typeorm/User";
import { UsersService } from "src/users/services/users/users.service";

export class SessionSerializer extends PassportSerializer {
    serializeUser(user: User, done: Function) {
        console.log("SerializeUser");
        done(null, user);
    }
    deserializeUser(user: User, done: Function) {
        console.log('DeserializeUser');
        const userDB = this.userService.findUserByUsername(user.username);
        return userDB? done(null, userDB) : done(null, null);
    }
    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService) {
        super();
    }
}