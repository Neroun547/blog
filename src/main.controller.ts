import {Controller, Get, Req, Res} from "@nestjs/common";
import { Request, Response } from "express";
import {ArticlesServiceDb} from "../db/articles/articles.service";
import {SettingsServiceDb} from "../db/settings/settings.service";
import {ArticlesService} from "./articles/service/articles.service";
const moment = require("moment");

@Controller()
export class MainController {
  constructor(
      private articlesServiceDb: ArticlesServiceDb,
      private settingsServiceDb: SettingsServiceDb,
      private articlesService: ArticlesService
  ) {}

  @Get()
  async getMainPage(@Req() req: Request, @Res() res: Response) {
    const articles = await this.articlesServiceDb.getArticlesDesc(10, 0);
    const blogDescription = await this.settingsServiceDb.getSettingByKey("blog_description");
    const loadMore = (await this.articlesServiceDb.getCountArticles()) > 10;

    res.render("main", {
      styles: ["/css/main.css"],
      scripts: ["/js/main.js", "/js/root.js"],
      articles: await this.articlesService.parseArticlesForMainPage(articles.map(el => ({ ...el, date: moment(el.date).format("YYYY-MM-DD HH:mm:ss") }))),
      blog_description: blogDescription ? blogDescription.value : "",
      loadMore: loadMore
    });
  }
}
