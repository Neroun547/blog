import { Module } from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./service/auth.service";
import {UsersModuleDb} from "../../../db/users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {JWT_EXPIRES_IN, JWT_SECRET} from "./constants";

@Module({
    imports: [
        UsersModuleDb,
        JwtModule.register({
            global: true,
            secret: JWT_SECRET,
            signOptions: {
                expiresIn: JWT_EXPIRES_IN
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
