import { Module } from "@nestjs/common";
import {ArticlesModuleDb} from "../../db/articles/articles.module";
import { ArticlesController } from "./articles.controller";
import {UserLikesModuleDb} from "../../db/user-likes/user-likes.module";
import {ArticlesService} from "./service/articles.service";
import {UserDislikesModuleDb} from "../../db/user-dislikes/user-dislikes.module";
import { SettingsModuleDb } from '../../db/settings/settings.module';

@Module({
    imports: [ArticlesModuleDb, UserLikesModuleDb, UserDislikesModuleDb, SettingsModuleDb],
    providers: [ArticlesService],
    controllers: [ArticlesController],
    exports: [ArticlesService]
})
export class ArticlesModule {}
