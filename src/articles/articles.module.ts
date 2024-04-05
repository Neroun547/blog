import { Module } from "@nestjs/common";
import {ArticlesModuleDb} from "../../db/articles/articles.module";
import { ArticlesController } from "./articles.controller";
import {UserLikesModuleDb} from "../../db/user-likes/user-likes.module";
import {ArticlesService} from "./service/articles.service";

@Module({
    imports: [ArticlesModuleDb, UserLikesModuleDb],
    providers: [ArticlesService],
    controllers: [ArticlesController]
})
export class ArticlesModule {}
