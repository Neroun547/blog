import {
    Body,
    Controller, Delete, FileTypeValidator,
    Get,
    HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe,
    ParseFilePipeBuilder, ParseIntPipe,
    Post,
    Req,
    Res,
    UploadedFile,
    UseGuards, UseInterceptors
} from "@nestjs/common";
import {AuthGuard} from "../auth/guards/jwt-auth.guard";
import {Request, Response} from "express";
import {FileInterceptor} from "@nestjs/platform-express";
import {FileValidationPipe} from "./pipes/file-validation.pipe";
import {UploadPhotoDto} from "./dto/upload-photo.dto";
import {GalleryServiceAdmin} from "./service/gallery.service";
import {GalleryServiceDb} from "../../../db/gallery/gallery.service";

@Controller()
export class GalleryControllerAdmin {
    constructor(private galleryServiceAdmin: GalleryServiceAdmin, private galleryServiceDb: GalleryServiceDb) {}

    @UseGuards(AuthGuard)
    @Get()
    async getGalleryPage(@Res() res: Response) {
        const countPublications = await this.galleryServiceDb.getCountPublications();
        const publications = await this.galleryServiceDb.getPublicationsDesc(10, 0);

        res.render("admin/gallery/gallery", {
            admin: true,
            styles: ["/css/admin/gallery/gallery.css", "/css/components/gallery/modal-for-photo.component.css", "/css/admin/components/upload-file-form.css"],
            scripts: ["/js/gallery/gallery.js"],
            publications: publications,
            loadMore: countPublications > 10
        });
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("file"))
    @Post()
    async uploadPhoto(@Body() body: UploadPhotoDto, @UploadedFile(FileValidationPipe) file: Express.Multer.File, @Res() res: Response) {
        await this.galleryServiceAdmin.savePublication(file.buffer, file.mimetype, body.description);

        res.redirect("/admin/gallery");
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async deletePublication(@Param("id", new ParseIntPipe()) id: number) {
        await this.galleryServiceAdmin.deletePublicationById(id);

        return;
    }
}
