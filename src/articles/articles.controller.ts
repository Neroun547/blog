import {Controller, Get, Param, ParseIntPipe, Query, Res} from "@nestjs/common";
import {ArticlesServiceDb} from "../../db/articles/articles.service";
import {Response} from "express";
const moment = require("moment");

@Controller()
export class ArticlesController {
    constructor(private articlesServiceDb: ArticlesServiceDb) {}

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
    async getArticle(@Param("file_name") fileName: string, @Res() res: Response) {
        res.render("articles/uploaded-articles/" + fileName);
    }
}
