import {Injectable, NotFoundException} from "@nestjs/common";
import {UsersServiceDb} from "../../../../db/users/users.service";
import {JwtService} from "@nestjs/jwt";
import { createHmac } from "crypto";
import {PASSWORD_HASH_SECRET} from "../constants";

@Injectable()
export class AuthService {
    constructor(
        private usersServiceDb: UsersServiceDb,
        private jwtService: JwtService
    ) {}

    async auth(username: string, password: string): Promise<string> {
        const userInDb = JSON.parse(JSON.stringify(await this.usersServiceDb.getUserByUsername(username)));

        if(!userInDb) {
            throw new NotFoundException();
        }
        const hmac = createHmac("sha512", PASSWORD_HASH_SECRET);

        hmac.update(password);

        if(userInDb.password === hmac.digest("hex")) {
            delete userInDb.password;

            return await this.jwtService.signAsync(userInDb);
        }
    }
}
