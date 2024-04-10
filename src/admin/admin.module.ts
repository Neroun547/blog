import { Module } from "@nestjs/common";
import {AuthModule} from "./auth/auth.module";
import { AdminController } from "./admin.controller";
import {ArticlesModuleAdmin} from "./articles/articles.module";
import {ArticlesModuleDb} from "../../db/articles/articles.module";
import {SettingsModuleDb} from "../../db/settings/settings.module";
import { GalleryModuleAdmin } from "./gallery/gallery.module";
import {MusicModuleAdmin} from "./music/music.module";

@Module({
    imports: [
        AuthModule,
        ArticlesModuleAdmin,
        ArticlesModuleDb,
        SettingsModuleDb,
        GalleryModuleAdmin,
        MusicModuleAdmin
    ],
    controllers: [AdminController]
})
export class AdminModule {}
