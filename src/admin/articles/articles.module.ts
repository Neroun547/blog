import { Module } from "@nestjs/common";
import {ArticlesController} from "./articles.controller";
import {ArticlesModuleDb} from "../../../db/articles/articles.module";
import { ArticlesServiceAdmin } from "./service/articles.service";


@Module({
    imports: [ArticlesModuleDb],
    controllers: [ArticlesController],
    providers: [ArticlesServiceAdmin]
})
export class ArticlesModuleAdmin {}
