import { Injectable } from "@nestjs/common";
import {GalleryServiceDb} from "../../../../db/gallery/gallery.service";
import { createHmac } from "crypto";
import { writeFile, unlink } from "fs/promises";
import { existsSync } from "fs";
import { resolve } from "path";
const moment = require("moment");

@Injectable()
export class GalleryServiceAdmin {
    constructor(private galleryServiceDb: GalleryServiceDb) {}

    async savePublication(fileBuffer: Buffer, mimetype: string, description: string) {
        const fileHash = createHmac("sha512", String(Date.now() + Math.floor(Math.random() * 1000))).digest("hex");

        await writeFile(resolve("static/uploaded-photo/" + fileHash + mimetype.replace("image/", ".")), fileBuffer);

        await this.galleryServiceDb.savePublication(
            fileHash + mimetype.replace("image/", "."),
            description,
            moment().format("YYYY-MM-DD HH:mm:ss")
        );
    }
    async deletePublicationById(id: number) {
        const publication = await this.galleryServiceDb.getPublicationById(id);

        if(existsSync(resolve("static/uploaded-photo/" + publication.file_name))) {
            unlink(resolve("static/uploaded-photo/" + publication.file_name));
        }
        await this.galleryServiceDb.deletePublicationById(id);
    }
}
