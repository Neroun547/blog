import {Controller, Delete, Get, Param, ParseIntPipe, Patch, Query, Req, Res} from "@nestjs/common";
import {ArticlesServiceDb} from "../../db/articles/articles.service";
import {Response, Request} from "express";
import {ArticlesService} from "./service/articles.service";
const moment = require("moment");

@Controller()
export class ArticlesController {
    constructor(
        private articlesServiceDb: ArticlesServiceDb,
        private articlesService: ArticlesService
    ) {}

    @Get("load-more")
    async loadMoreArticles(
        @Query("take", new ParseIntPipe()) take: number,
        @Query("skip", new ParseIntPipe()) skip: number,
        @Query("name") name: string
    ) {
        if(name) {
            const articles = await this.articlesServiceDb.getArticlesLikeNameDesc(name, take, skip);
            const loadMore = await this.articlesServiceDb.getCountArticlesLikeName(name) > skip + 10;

            return { loadMore: loadMore, articles: articles.map(el => ({ ...el, date: moment(el.date).format("YYYY-MM-DD HH:mm:ss") })) };
        }
        const articles = await this.articlesServiceDb.getArticlesDesc(take, skip);
        const loadMore = await this.articlesServiceDb.getCountArticles() > skip + 10;

        return { loadMore: loadMore, articles: articles.map(el => ({ ...el, date: moment(el.date).format("YYYY-MM-DD HH:mm:ss") })) };
    }

    @Get("by-filters")
    async getArticlesByFilters(
        @Query("name") name: string,
        @Query("take", new ParseIntPipe()) take: number,
        @Query("skip", new ParseIntPipe()) skip: number
    ) {
        const articles = await this.articlesServiceDb.getArticlesLikeNameDesc(name, take, skip);
        const loadMore = await this.articlesServiceDb.getCountArticlesLikeName(name) > skip + 10;

        return { loadMore: loadMore, articles: articles.map(el => ({ ...el, date: moment(el.date).format("YYYY-MM-DD HH:mm:ss") })) };
    }

    @Get(":file_name")
    async getArticle(@Req() req: Request, @Param("file_name") fileName: string, @Res() res: Response) {
        const { likes, dislikes, userAlreadySetDislike, userAlreadySetLike } = await this.articlesService.getInfoAboutLikesAndDislikes(fileName, (req.headers["user-agent"] + req.socket.remoteAddress).replace(/ /g, ""));

        res.render("articles/uploaded-articles/" + fileName, {
            styles: ["/css/articles/article.css"],
            layout: "article-layout",
            scripts: ["/js/articles/article.js"],
            fileName: fileName,
            likes: likes,
            dislikes: dislikes,
            userAlreadySetDislike: userAlreadySetDislike,
            userAlreadySetLike: userAlreadySetLike
        });
    }

    @Patch(":file_name/add-like")
    async addLikes(@Req() req: Request, @Param("file_name") fileName: string) {
        await this.articlesService.incrementLikes(fileName, (req.headers["user-agent"] + req.socket.remoteAddress).replace(/ /g, ""));

        return;
    }

    @Delete(":file_name/remove-like")
    async removeLike(@Req() req: Request, @Param("file_name") fileName: string) {
        await this.articlesService.decrementLikes(fileName, (req.headers["user-agent"] + req.socket.remoteAddress).replace(/ /g, ""));

        return;
    }


    @Patch(":file_name/add-dislike")
    async addDislike() {

    }
}
