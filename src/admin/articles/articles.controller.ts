import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Res, UseGuards} from "@nestjs/common";
import { Response } from "express";
import {AuthGuard} from "../auth/guards/jwt-auth.guard";
import {UploadArticleDto} from "./dto/upload-article.dto";
import {ArticlesServiceAdmin} from "./service/articles.service";
import {ArticlesServiceDb} from "../../../db/articles/articles.service";
import { readFile } from "fs/promises";
import { resolve } from "path";
const moment = require("moment");

@Controller()
export class ArticlesController {
    constructor(
        private articlesServiceAdmin: ArticlesServiceAdmin,
        private articlesServiceDb: ArticlesServiceDb
    ) {}

    @UseGuards(AuthGuard)
    @Get()
    async getArticlesPage(@Res() res: Response) {
        const articles = await this.articlesServiceDb.getArticlesDesc(10, 0);
        const countArticles = await this.articlesServiceDb.getCountArticles();

        res.render("admin/articles/articles", {
            admin: true,
            styles: ["/css/admin/articles/articles.css", "/css/components/articles/article.component.css", "/css/components/load-more-btn.css"],
            scripts: ["/js/admin/articles/articles.js"],
            loadMore: countArticles > 10,
            articles: articles.map(el => ({ ...el, date: moment(el.date).format("YYYY-MM-DD HH:mm:ss") }))
        });
    }

    @UseGuards(AuthGuard)
    @Get("edit/:id")
    async getEditArticlePage(@Param("id", new ParseIntPipe()) id: number, @Res() res: Response) {
        const article = await this.articlesServiceDb.getArticleById(id);
        let content = (await readFile(resolve("views/articles/uploaded-articles/" + article.file_name))).toString();

        content = content.replace(`<h2 style="margin: 0; margin-top: 30px; text-align: center;">Назва: ${article.name}</h2>`, "");
        content = content.replace(`<h3 style="text-align: center">Тема: ${article.theme}</h3>`, "");

        res.render("admin/articles/edit-article", {
            name: article.name,
            theme: article.theme,
            content: content,
            id: id,
            styles: ["/css/admin/articles/upload-article.css"],
            admin: true
        });
    }

    @UseGuards(AuthGuard)
    @Post("edit/:id")
    async editArticle(@Param("id", new ParseIntPipe()) id: number, @Body() body: UploadArticleDto, @Res() res: Response) {
        await this.articlesServiceAdmin.updateArticleById(id, body);

        res.redirect("/admin");
    }

    @UseGuards(AuthGuard)
    @Get("upload-article")
    getUploadArticlePage(@Res() res: Response) {
        res.render("admin/articles/upload-article", {
            styles: ["/css/admin/articles/upload-article.css"],
            admin: true
        });
    }

    @UseGuards(AuthGuard)
    @Post()
    async uploadArticle(@Body() body: UploadArticleDto, @Res() res: Response) {
        await this.articlesServiceAdmin.uploadArticle(body);

        res.redirect("/admin");
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async deleteArticleById(@Param("id", new ParseIntPipe()) id: number) {
        await this.articlesServiceDb.deleteArticleById(id);

        return;
    }
}
