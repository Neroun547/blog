import { Module } from "@nestjs/common";
import {AuthModule} from "./auth/auth.module";
import { AdminController } from "./admin.controller";
import {ArticlesModuleAdmin} from "./articles/articles.module";
import {ArticlesModuleDb} from "../../db/articles/articles.module";
import {SettingsModuleDb} from "../../db/settings/settings.module";

@Module({
    imports: [AuthModule, ArticlesModuleAdmin, ArticlesModuleDb, SettingsModuleDb],
    controllers: [AdminController]
})
export class AdminModule {}
