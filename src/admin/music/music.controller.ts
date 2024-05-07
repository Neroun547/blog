import {
    Body,
    Controller,
    Delete,
    Get,
    Param, ParseIntPipe,
    Post,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {Response} from "express";
import {AuthGuard} from "../auth/guards/jwt-auth.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {UploadMusicDto} from "./dto/upload-music.dto";
import {MusicFileValidationPipe} from "./pipes/music-file-validation.pipe";
import {MusicService} from "./service/music.service";

@Controller()
export class MusicControllerAdmin {
    constructor(private musicService: MusicService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getMusicAdminPage(@Res() res: Response) {
        res.render("admin/music/music", {
            admin: true,
            styles: ["/css/admin/components/upload-file-form.css", "/css/admin/music/music.css"],
            scripts: ["/js/admin/music/music.js"],
            music: await this.musicService.getMusic(10, 0)
        });
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("file"))
    @Post()
    async uploadMusic(@Body() body: UploadMusicDto, @UploadedFile(MusicFileValidationPipe) file: Express.Multer.File, @Res() res: Response) {
        await this.musicService.saveMusic(file.buffer, body);

        res.redirect("/admin/music");
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async deleteMusicById(@Param("id", new ParseIntPipe()) musicId: number) {
        await this.musicService.deleteMusic(musicId);

        return;
    }
}
