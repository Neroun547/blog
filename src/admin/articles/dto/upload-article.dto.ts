import {IsString, Length} from "class-validator";
import {UploadArticleInterface} from "../interfaces/upload-article.interface";

export class UploadArticleDto implements UploadArticleInterface {
    @IsString()
    @Length(1, 255)
    name: string;

    @IsString()
    @Length(1, 255)
    theme: string;

    @IsString()
    content: string;
}
