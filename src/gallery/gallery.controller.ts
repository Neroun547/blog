import {Controller, Get, Param, ParseIntPipe, Query, Res} from "@nestjs/common";
import {Response} from "express";
import {GalleryServiceDb} from "../../db/gallery/gallery.service";
const moment = require("moment");

@Controller()
export class GalleryController {
    constructor(private galleryServiceDb: GalleryServiceDb) {}

    @Get()
    async getGalleryPage(@Res() res: Response) {
        const publications = await this.galleryServiceDb.getPublicationsDesc(10, 0);
        const countPublications = await this.galleryServiceDb.getCountPublications();

        res.render("gallery/gallery", {
            publications: publications,
            styles: ["/css/gallery/gallery.css"],
            scripts: ["/js/gallery/gallery.js", "/js/root.js", "/js/search-articles.js"],
            loadMore: countPublications > 10
        });
    }

    @Get("load-more")
    async loadMore(@Query("skip", new ParseIntPipe()) skip: number, @Query("take", new ParseIntPipe()) take: number) {
        const count = await this.galleryServiceDb.getCountPublications();
        const publications = await this.galleryServiceDb.getPublicationsDesc(take, skip);

        return { loadMore: count > skip + 10, publications: publications };
    }

    @Get(":id")
    async getInfoAboutPublication(@Param("id", new ParseIntPipe()) id: number) {
        const data = await this.galleryServiceDb.getPublicationById(id);

        data.date = moment(data.date).format("YYYY-MM-DD HH:mm:ss");

        return data;
    }
}
