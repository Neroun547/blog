import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@mikro-orm/nestjs";
import {UserDislikes} from "./user-dislikes.entity";
import {EntityRepository} from "@mikro-orm/mysql";

@Injectable()
export class UserDislikesServiceDb {
    constructor(@InjectRepository(UserDislikes) private repository: EntityRepository<UserDislikes>) {}

    async getUserDislikeByKeyAndArticleId(key: string, articleId: number) {
        return await this.repository.findOne({ key: key, article_id: articleId });
    }

    async saveUserDislike(articleId: number, uniqueKey: string) {
        await this.repository.nativeInsert({ article_id: articleId, key: uniqueKey });
    }

    async deleteUserDislikeByArticleIdAndKey(articleId: number, uniqueKey: string) {
        await this.repository.nativeDelete({ article_id: articleId, key: uniqueKey });
    }

    async getCountDislikesByArticleId(articleId: number) {
        return await this.repository.count({ article_id: articleId });
    }
}
