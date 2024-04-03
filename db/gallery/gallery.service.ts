import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@mikro-orm/nestjs";
import {Gallery} from "./gallery.entity";
import {EntityRepository} from "@mikro-orm/mysql";

@Injectable()
export class GalleryServiceDb {
    constructor(@InjectRepository(Gallery) private repository: EntityRepository<Gallery>) {}

    async savePublication(fileName: string, description: string, date: string) {
        await this.repository.nativeInsert({ file_name: fileName, description: description, date: date });
    }
    async getPublicationsDesc(take: number, skip: number) {
        return await this.repository.findAll({ limit: take, offset: skip, orderBy: { id: "DESC" } });
    }
    async getPublicationById(id: number) {
        return await this.repository.findOne({ id: id });
    }
    async deletePublicationById(id: number) {
        await this.repository.nativeDelete({ id: id });
    }
    async getCountPublications() {
        return await this.repository.count();
    }
}
