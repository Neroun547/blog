import {Body, Controller, Post, Res} from "@nestjs/common";
import {SaveBlogDescriptionDto} from "./dto/save-blog-description.dto";
import {SettingsServiceDb} from "../../../db/settings/settings.service";
import { Response } from "express";

@Controller()
export class SettingsControllerAdmin {
    constructor(private settingsServiceDb: SettingsServiceDb) {}

    @Post("save-blog-description")
    async saveBlogDescription(@Body() body: SaveBlogDescriptionDto, @Res() res: Response) {
        await this.settingsServiceDb.updateSettingByKey("blog_description", body.description);

        res.redirect("/admin");
    }
}
