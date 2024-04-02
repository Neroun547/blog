import { Injectable } from "@nestjs/common";
import {InjectRepository} from "@mikro-orm/nestjs";
import {Users} from "./users.entity";
import {EntityRepository} from "@mikro-orm/mysql";

@Injectable()
export class UsersServiceDb {
    constructor(@InjectRepository(Users) private repository: EntityRepository<Users>) {}

    async getUserByUsername(username: string) {
        return await this.repository.findOne({ username: username });
    }
}
