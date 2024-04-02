import { Injectable } from "@nestjs/common";
import {UploadArticleInterface} from "../interfaces/upload-article.interface";
import {ArticlesServiceDb} from "../../../../db/articles/articles.service";
import { createHmac } from "crypto";
import { writeFile } from "fs/promises";
import { resolve } from "path";
const moment = require("moment");

@Injectable()
export class ArticlesServiceAdmin {
    constructor(private articlesServiceDb: ArticlesServiceDb) {}

    async uploadArticle(data: UploadArticleInterface) {
        const fileNameHash = createHmac("sha512", String(Date.now() + Math.floor(Math.random() * 1000))).digest("hex");

        await writeFile(
            resolve("views/articles/uploaded-articles/" + fileNameHash + ".hbs"),
            `
            <h2 style="margin: 0; margin-top: 30px; text-align: center;">Назва: ${data.name}</h2>
            <h3 style="text-align: center">Тема: ${data.theme}</h3>
            ${data.content}`
        );

        await this.articlesServiceDb.saveArticle({
            name: data.name,
            theme: data.theme,
            file_name: fileNameHash + ".hbs",
            date: moment().format("YYYY-MM-DD HH:mm:ss")
        });
    }
    async updateArticleById(id: number, data: UploadArticleInterface) {
        const article = await this.articlesServiceDb.getArticleById(id);

        await writeFile(
            resolve("views/articles/uploaded-articles/" + article.file_name),
            `
            <h2 style="margin: 0; margin-top: 30px; text-align: center;">Назва: ${data.name}</h2>
            <h3 style="text-align: center">Тема: ${data.theme}</h3>
            ${data.content}`
        );

        await this.articlesServiceDb.updateArticleNameAndThemeById(id, data.name, data.theme);
    }
}
