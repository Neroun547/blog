import {Controller, Get, Res} from "@nestjs/common";
import {Response} from "express";

@Controller()
export class AboutAndFeedbackController {
    @Get()
    getAboutAndFeedbackPage(@Res() res: Response) {
        res.render("about-and-feedback/about-and-feedback", {
            scripts: ["/js/about-and-feedback/about-and-feedback.js", "/js/root.js", "/js/search-articles.js"],
        });
    }
}
