import { Module } from "@nestjs/common";
import {MusicControllerAdmin} from "./music.controller";

@Module({
    controllers: [MusicControllerAdmin]
})
export class MusicModuleAdmin {}
