import {BadRequestException, Injectable} from "@nestjs/common";
import {ArticlesServiceDb} from "../../../db/articles/articles.service";
import {UserLikesServiceDb} from "../../../db/user-likes/user-likes.service";
import {GetInfoAboutLikesAndDislikesInterface} from "../interfaces/get-info-about-likes-and-dislikes.interface";
import {UserDislikesServiceDb} from "../../../db/user-dislikes/user-dislikes.service";
import { Request } from "express";
import {readFile} from "fs/promises";
import {resolve} from "path";

@Injectable()
export class ArticlesService {
    constructor(
        private articlesServiceDb: ArticlesServiceDb,
        private userLikesServiceDb: UserLikesServiceDb,
        private userDislikesServiceDb: UserDislikesServiceDb
    ) {}

    getUniqueKeyForLikesAndDislikes(req: Request) {
        let uniqueKey = (req.headers["user-agent"] + req.socket.remoteAddress).replace(/ /g, "");
        uniqueKey = uniqueKey.length > 255 ? uniqueKey.substring(0, 255) : uniqueKey

        return uniqueKey;
    }

    async incrementLikes(fileName: string, uniqueKey: string) {
        const article = await this.articlesServiceDb.getArticleByFilename(fileName);
        const userLikeInDb = await this.userLikesServiceDb.getUserLikeByKeyAndArticleId(article.id, uniqueKey);
        const userDislikeInDb = await this.userDislikesServiceDb.getUserDislikeByKeyAndArticleId(uniqueKey, article.id);

        if(!userLikeInDb) {
            if(userDislikeInDb) {
                await this.userDislikesServiceDb.deleteUserDislikeByArticleIdAndKey(article.id, uniqueKey);
            }
            await this.userLikesServiceDb.saveUserLike(article.id, uniqueKey);

            return;
        }
        throw new BadRequestException();
    }
    async incrementDislikes(fileName: string, uniqueKey: string) {
        const article = await this.articlesServiceDb.getArticleByFilename(fileName);
        const userDislikeInDb = await this.userDislikesServiceDb.getUserDislikeByKeyAndArticleId(uniqueKey, article.id);
        const userLikeInDb = await this.userLikesServiceDb.getUserLikeByKeyAndArticleId(article.id, uniqueKey);

        if(!userDislikeInDb) {
            if(userLikeInDb) {
                await this.userLikesServiceDb.deleteUserLikeByArticleIdAndKey(article.id, uniqueKey);
            }
            await this.userDislikesServiceDb.saveUserDislike(article.id, uniqueKey);

            return;
        }
        throw new BadRequestException();
    }
    async decrementDislikes(fileName: string, uniqueKey: string) {
        const article = await this.articlesServiceDb.getArticleByFilename(fileName);
        const userDislikeInDb = await this.userDislikesServiceDb.getUserDislikeByKeyAndArticleId(uniqueKey, article.id);

        if(userDislikeInDb) {
            await this.userDislikesServiceDb.deleteUserDislikeByArticleIdAndKey(article.id, uniqueKey);

            return;
        }
        throw new BadRequestException();
    }
    async getInfoAboutLikesAndDislikes(fileName: string, uniqueKey: string): Promise<GetInfoAboutLikesAndDislikesInterface> {
        const article = await this.articlesServiceDb.getArticleByFilename(fileName);

        const countLikes =  await this.userLikesServiceDb.getCountLikesByArticleId(article.id);
        const userAlreadySetLike = !!(await this.userLikesServiceDb.getUserLikeByKeyAndArticleId(article.id, uniqueKey));

        const countDislikes = await this.userDislikesServiceDb.getCountDislikesByArticleId(article.id);
        const userAlreadySetDisLike = !!(await this.userDislikesServiceDb.getUserDislikeByKeyAndArticleId(uniqueKey, article.id));;

        return {
            dislikes: countDislikes,
            likes: countLikes,
            userAlreadySetLike: userAlreadySetLike,
            userAlreadySetDislike: userAlreadySetDisLike
        };
    }
    async decrementLikes(fileName: string, uniqueKey: string) {
        const article = await this.articlesServiceDb.getArticleByFilename(fileName);
        const userLikeInDb = await this.userLikesServiceDb.getUserLikeByKeyAndArticleId(article.id, uniqueKey);

        if(userLikeInDb) {
            await this.userLikesServiceDb.deleteUserLikeByArticleIdAndKey(article.id, uniqueKey);

            return;
        }
        throw new BadRequestException();
    }
    async parseArticlesForMainPage(articles) {
        return await Promise.all(articles.map(async el => {
            let smallTextResult = "";

            (await readFile(resolve("views/articles/uploaded-articles/" + el.file_name))).toString().substring(0, 700).split("\n")
               .forEach((el, index) => {
                   if(index > 2) {
                       smallTextResult += el.trim();
                   }
               });
            return {
               ...el,
               smallText: smallTextResult + " ..."
           }
        }));
    }
}
