import { Module } from "@nestjs/common";
import {ArticlesModuleDb} from "../../db/articles/articles.module";
import { ArticlesController } from "./articles.controller";

@Module({
    imports: [ArticlesModuleDb],
    controllers: [ArticlesController]
})
export class ArticlesModule {}
