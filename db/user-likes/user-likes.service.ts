import { Injectable } from "@nestjs/common";
import {InjectRepository} from "@mikro-orm/nestjs";
import {UserLikes} from "./user-likes.entity";
import {EntityRepository} from "@mikro-orm/mysql";

@Injectable()
export class UserLikesServiceDb {
    constructor(@InjectRepository(UserLikes) private repository: EntityRepository<UserLikes>) {}

    async getUserLikeByIpAddressAndArticleId(articleId: number, ipAddress: string) {
        return await this.repository.findOne({ key: ipAddress, article_id: articleId });
    }
    async saveUserLike(articleId: number, ipAddress: string) {
        await this.repository.nativeInsert({ article_id: articleId, key: ipAddress });
    }
    async getCountLikesByArticleId(articleId: number) {
        return await this.repository.count({ article_id: articleId });
    }

    async deleteUserLikeByArticleIdAndKey(articleId: number, uniqueKey: string) {
        await this.repository.nativeDelete({ article_id: articleId, key: uniqueKey });
    }
}
