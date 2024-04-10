import {Controller, Get, Res} from "@nestjs/common";
import {Response} from "express";

@Controller()
export class MusicControllerAdmin {

    @Get()
    getMusicAdminPage(@Res() res: Response) {
        res.render("admin/music/music", {
            admin: true,
            styles: ["/css/admin/components/upload-file-form.css"]
        });
    }
}
