import {IsString, Length} from "class-validator";

export class UploadMusicDto {
    @Length(1, 255)
    @IsString()
    name: string;

    @Length(1, 255)
    @IsString()
    author: string;

    @Length(1, 255)
    @IsString()
    genre: string;
}
