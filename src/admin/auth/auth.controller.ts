import {Body, Controller, Get, Post, Res} from "@nestjs/common";
import { Response } from "express";
import {AuthService} from "./service/auth.service";
import {AuthDto} from "./dto/auth.dto";

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get()
    getAuthPage(@Res() res: Response) {
        res.render("admin/auth/auth", {
            admin: true,
            styles: ["/css/admin/auth/auth.css"],
            scripts: ["/js/admin/auth/auth.js"]
        });
    }

    @Post()
    async auth(@Body() body: AuthDto, @Res() res: Response) {
        const token = await this.authService.auth(body.username, body.password);

        res.cookie("token", token);
        res.sendStatus(200);
    }
}
