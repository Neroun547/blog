import { Module } from "@nestjs/common";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {UserLikes} from "./user-likes.entity";
import {UserLikesServiceDb} from "./user-likes.service";

@Module({
    imports: [MikroOrmModule.forFeature([UserLikes])],
    providers: [UserLikesServiceDb],
    exports: [UserLikesServiceDb]
})
export class UserLikesModuleDb {}
