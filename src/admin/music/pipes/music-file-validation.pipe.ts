import {PipeTransform, Injectable, ArgumentMetadata, BadRequestException} from '@nestjs/common';

@Injectable()
export class MusicFileValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const maxSize = 10000000;

        if(value.size > maxSize) {
            throw new BadRequestException();
        }
        if(value.mimetype !== "audio/mpeg") {
            throw new BadRequestException();
        }
        return value;
    }
}
