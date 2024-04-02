import {Controller, Get, Res, UseGuards} from "@nestjs/common";
import {Response} from "express";
import {AuthGuard} from "./auth/guards/jwt-auth.guard";
import {ArticlesServiceDb} from "../../db/articles/articles.service";
import {SettingsServiceDb} from "../../db/settings/settings.service";

@Controller()
export class AdminController {
    constructor(
        private articlesServiceDb: ArticlesServiceDb,
        private settingsServiceDb: SettingsServiceDb
    ) {}

    @UseGuards(AuthGuard)
    @Get()
    async getMainAdminPage(@Res() res: Response) {
        const articles = await this.articlesServiceDb.getArticlesDesc(10, 0);
        const blogDescription = await this.settingsServiceDb.getSettingByKey("blog_description");

        res.render("admin/main", {
            admin: true,
            styles: ["/css/admin/main.css", "/css/components/articles/article.component.css"],
            scripts: ["/js/admin/main.js"],
            articles: articles,
            blog_description: blogDescription ? blogDescription.value : ""
        });
    }

    @UseGuards(AuthGuard)
    @Get("exit")
    exit(@Res() res: Response) {
        res.cookie("token", "");
        res.redirect("/admin/auth");
    }
}
