import {BadRequestException, Injectable} from "@nestjs/common";
import {ArticlesServiceDb} from "../../../db/articles/articles.service";
import {UserLikesServiceDb} from "../../../db/user-likes/user-likes.service";
import {GetInfoAboutLikesAndDislikesInterface} from "../interfaces/get-info-about-likes-and-dislikes.interface";

@Injectable()
export class ArticlesService {
    constructor(
        private articlesServiceDb: ArticlesServiceDb,
        private userLikesServiceDb: UserLikesServiceDb
    ) {}

    async incrementLikes(fileName: string, uniqueKey: string) {
        const article = await this.articlesServiceDb.getArticleByFilename(fileName);
        const userLikeInDb = await this.userLikesServiceDb.getUserLikeByIpAddressAndArticleId(article.id, uniqueKey);

        if(!userLikeInDb) {
            await this.articlesServiceDb.incrementLikeByFileName(fileName);
            await this.userLikesServiceDb.saveUserLike(article.id, uniqueKey);

            return;
        }
        throw new BadRequestException();
    }
    async getInfoAboutLikesAndDislikes(fileName: string, uniqueKey: string): Promise<GetInfoAboutLikesAndDislikesInterface> {
        const article = await this.articlesServiceDb.getArticleByFilename(fileName);
        const countLikes =  await this.userLikesServiceDb.getCountLikesByArticleId(article.id);
        const userAlreadySetLike = (await this.userLikesServiceDb.getUserLikeByIpAddressAndArticleId(article.id, uniqueKey)) ? true : false;

        return { dislikes: 0, likes: countLikes, userAlreadySetLike: userAlreadySetLike, userAlreadySetDislike: false };
    }

    async decrementLikes(fileName: string, uniqueKey: string) {
        const article = await this.articlesServiceDb.getArticleByFilename(fileName);
        const userLikeInDb = await this.userLikesServiceDb.getUserLikeByIpAddressAndArticleId(article.id, uniqueKey);

        if(userLikeInDb) {
            await this.articlesServiceDb.decrementLikeByFileName(fileName);
            await this.userLikesServiceDb.deleteUserLikeByArticleIdAndKey(article.id, uniqueKey);

            return;
        }
        throw new BadRequestException();
    }
}
