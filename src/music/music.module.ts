import {Module} from "@nestjs/common";
import {MusicController} from "./music.controller";
import {MusicModuleDb} from "../../db/music/music.module";
import {MusicService} from "./service/music.service";

@Module({
    imports: [MusicModuleDb],
    providers: [MusicService],
    controllers: [MusicController]
})
export class MusicModule {}
