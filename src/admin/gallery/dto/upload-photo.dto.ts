import {IsString, Length} from "class-validator";

export class UploadPhotoDto {
    @IsString()
    @Length(0, 500)
    description: string;
}
