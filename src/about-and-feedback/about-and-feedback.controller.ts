import {Controller, Get, Res} from "@nestjs/common";
import {Response} from "express";

@Controller()
export class AboutAndFeedbackController {
    @Get()
    getAboutAndFeedbackPage(@Res() res: Response) {
        res.render("about-and-feedback/about-and-feedback");
    }
}
