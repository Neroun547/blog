import {Controller, Get, Res} from "@nestjs/common";
import {Response} from "express";

@Controller()
export class GalleryController {
    @Get()
    getGalleryPage(@Res() res: Response) {
        res.render("gallery/gallery");
    }
}
