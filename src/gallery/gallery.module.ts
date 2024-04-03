import { Module } from "@nestjs/common";
import {GalleryController} from "./gallery.controller";
import {GalleryModuleDb} from "../../db/gallery/gallery.module";

@Module({
    imports: [GalleryModuleDb],
    controllers: [GalleryController]
})
export class GalleryModule {}
