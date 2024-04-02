import {IsString, Length} from "class-validator";

export class SaveBlogDescriptionDto {
    @IsString()
    @Length(1, 500)
    description: string;
}
