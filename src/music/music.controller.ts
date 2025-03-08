import {Controller, Get, Res} from "@nestjs/common";
import { Response } from "express";
import {MusicService} from "./service/music.service";

@Controller()
export class MusicController {
    constructor(private musicService: MusicService) {}

    @Get()
    async getMusicPage(@Res() res: Response) {
        res.render("music/music", {
            styles: ["/css/music/music.css"],
            scripts: ["/js/admin/music/disable-multiply-audio-play.js", "/js/music/music.js", "/js/root.js"],
            music: await this.musicService.getMusic(10, 0)
        });
    }
}
