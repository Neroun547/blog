import {PipeTransform, Injectable, ArgumentMetadata, BadRequestException} from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const maxSize = 10000000;

        if(value.size > maxSize) {
            throw new BadRequestException();
        }
        if(value.mimetype !== "image/jpg" && value.mimetype !== "image/png" && value.mimetype !== "image/jpeg") {
            throw new BadRequestException();
        }
        return value;
    }
}
