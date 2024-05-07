import { Module } from "@nestjs/common";
import {MusicControllerAdmin} from "./music.controller";
import {MusicModuleDb} from "../../../db/music/music.module";
import { MusicService } from "./service/music.service";

@Module({
    imports: [MusicModuleDb],
    providers: [MusicService],
    controllers: [MusicControllerAdmin]
})
export class MusicModuleAdmin {}
