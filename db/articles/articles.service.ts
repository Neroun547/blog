import { Injectable } from "@nestjs/common";
import {InjectRepository} from "@mikro-orm/nestjs";
import {Articles} from "./articles.entity";
import {EntityRepository} from "@mikro-orm/mysql";
import {ArticlesInterface} from "./interfaces/articles.interface";

@Injectable()
export class ArticlesServiceDb {
    constructor(@InjectRepository(Articles) private repository: EntityRepository<Articles>) {}

    async saveArticle(data: ArticlesInterface) {
        await this.repository.nativeInsert({ name: data.name, theme: data.theme, file_name: data.file_name, date: data.date, likes: data.likes, dislikes: data.dislikes });
    }
    async getArticlesDesc(take: number, skip: number) {
        return await this.repository.findAll({ limit: take, offset: skip, orderBy: { id: "DESC" } });
    }
    async getArticleById(id: number) {
        return await this.repository.findOne({ id: id });
    }
    async deleteArticleById(id: number) {
        await this.repository.nativeDelete({ id: id });
    }
    async getCountArticles() {
        return await this.repository.count();
    }
    async updateArticleNameAndThemeById(id: number, name: string, theme: string) {
        await this.repository.nativeUpdate({ id: id }, { name: name, theme: theme });
    }
    async getArticlesLikeNameDesc(name: string, take: number, skip: number) {
        return await this.repository.find({ name: { $like: "%" + name + "%" } }, { offset: skip, limit: take, orderBy: { id: "DESC" } });
    }
    async getCountArticlesLikeName(name: string) {
        return await this.repository.count({ name: { $like: "%" + name + "%" } });
    }
    async incrementLikeByFileName(fileName: string) {
        const article = await this.repository.findOne({ file_name: fileName });

        if(typeof article.likes === "number") {
            await this.repository.nativeUpdate({ id: article.id }, { likes: article.likes += 1 });
        } else {
            await this.repository.nativeUpdate({ id: article.id }, { likes: 1 });
        }
    }

    async getArticleByFilename(fileName: string) {
        return await this.repository.findOne({ file_name: fileName });
    }

    async decrementLikeByFileName(fileName: string) {
        const article = await this.repository.findOne({ file_name: fileName });

        await this.repository.nativeUpdate({ id: article.id }, { likes: article.likes - 1 });
    }
}
