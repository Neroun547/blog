import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@mikro-orm/nestjs";
import {Music} from "./music.entity";
import {EntityRepository} from "@mikro-orm/mysql";
import {MusicInterface} from "./interfaces/music.interface";

@Injectable()
export class MusicServiceDb {
    constructor(@InjectRepository(Music) private repository: EntityRepository<Music>) {}

    async saveMusic(data: MusicInterface) {
        await this.repository.nativeInsert(data);
    }
    async getMusic(take: number, skip: number) {
        return await this.repository.find({  }, { limit: take, offset: skip });
    }
    async getMusicById(id: number) {
        return await this.repository.findOne({ id: id });
    }
    async deleteMusicById(id: number) {
        await this.repository.nativeDelete({ id: id });
    }
}
