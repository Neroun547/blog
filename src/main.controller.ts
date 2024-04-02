import {Controller, Get, Req, Res} from "@nestjs/common";
import { Request, Response } from "express";
import {ArticlesServiceDb} from "../db/articles/articles.service";
import {SettingsServiceDb} from "../db/settings/settings.service";
const moment = require("moment");

@Controller()
export class MainController {
  constructor(
      private articlesServiceDb: ArticlesServiceDb,
      private settingsServiceDb: SettingsServiceDb
  ) {}

  @Get()
  async getMainPage(@Req() req: Request, @Res() res: Response) {
    const articles = await this.articlesServiceDb.getArticlesDesc(10, 0);
    const blogDescription = await this.settingsServiceDb.getSettingByKey("blog_description");
    const loadMore = (await this.articlesServiceDb.getCountArticles()) > 10;

    res.render("main", {
      styles: ["/css/main.css", "/css/components/articles/article.component.css", "/css/components/load-more-btn.css"],
      scripts: ["/js/main.js"],
      articles: articles.map(el => ({ ...el, date: moment(el.date).format("YYYY-MM-DD HH:mm:ss") })),
      blog_description: blogDescription ? blogDescription.value : "",
      loadMore: loadMore
    });
  }
}
