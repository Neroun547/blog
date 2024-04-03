import { Module } from "@nestjs/common";
import {GalleryControllerAdmin} from "./gallery.controller";
import {GalleryServiceAdmin} from "./service/gallery.service";
import {GalleryModuleDb} from "../../../db/gallery/gallery.module";

@Module({
    imports: [GalleryModuleDb],
    controllers: [GalleryControllerAdmin],
    providers: [GalleryServiceAdmin]
})
export class GalleryModuleAdmin {}
