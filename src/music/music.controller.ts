import {Controller, Get, Res} from "@nestjs/common";
import { Response } from "express";

@Controller()
export class MusicController {
    @Get()
    getMusicPage(@Res() res: Response) {
        res.render("music/music", {
            styles: ["/css/music/music.css"]
        });
    }
}
