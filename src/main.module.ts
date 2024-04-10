import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import {ConfigModule} from "@nestjs/config";
import {RouterModule} from "@nestjs/core";
import {AuthModule} from "./admin/auth/auth.module";
import {AdminModule} from "./admin/admin.module";
import {GalleryModule} from "./gallery/gallery.module";
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Users } from "../db/users/users.entity";
import {ArticlesModuleAdmin} from "./admin/articles/articles.module";
import {Articles} from "../db/articles/articles.entity";
import {ArticlesModuleDb} from "../db/articles/articles.module";
import {ArticlesModule} from "./articles/articles.module";
import {Settings} from "../db/settings/settings.entity";
import {SettingsModuleAdmin} from "./admin/settings/settings.module";
import {SettingsModuleDb} from "../db/settings/settings.module";
import {GalleryModuleAdmin} from "./admin/gallery/gallery.module";
import {Gallery} from "../db/gallery/gallery.entity";
import { UserLikes } from "../db/user-likes/user-likes.entity";
import {UserDislikes} from "../db/user-dislikes/user-dislikes.entity";
import {AboutAndFeedbackModule} from "./about-and-feedback/about-and-feedback.module";
import {MusicModule} from "./music/music.module";
import {MusicModuleAdmin} from "./admin/music/music.module";

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: '.env',
      }),
      MikroOrmModule.forRoot({
          dbName: process.env.DB_NAME,
          user: process.env.DB_USER,
          host: "127.0.0.1",
          port: Number(process.env.DB_PORT),
          password: process.env.DB_PASSWORD,
          type: "mysql",
          entities: [Users, Articles, Settings, Gallery, UserLikes, UserDislikes]
      }),
      AdminModule,
      AuthModule,
      GalleryModule,
      ArticlesModule,
      SettingsModuleAdmin,
      SettingsModuleDb,
      GalleryModuleAdmin,
      AboutAndFeedbackModule,
      MusicModule,
      MusicModuleAdmin,
      RouterModule.register([
          { path: "/admin", module: AdminModule, children: [
                  { path: "auth", module: AuthModule },
                  { path: "articles", module: ArticlesModuleAdmin },
                  { path: "settings", module: SettingsModuleAdmin },
                  { path: "gallery", module: GalleryModuleAdmin },
                  { path: "music", module: MusicModuleAdmin }
              ]
          },
          {
              path: "/gallery",
              module: GalleryModule
          },
          {
              path: "/articles",
              module: ArticlesModule
          },
          {
              path: "/about-and-feedback",
              module: AboutAndFeedbackModule
          },
          {
              path: "/music",
              module: MusicModule
          }
      ]),
      ArticlesModuleDb
  ],
  controllers: [MainController],
  providers: [],
})
export class MainModule {}
