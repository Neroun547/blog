import {Injectable} from "@nestjs/common";
import {MusicServiceDb} from "../../../db/music/music.service";

@Injectable()
export class MusicService {
    constructor(private musicServiceDb: MusicServiceDb) {}

    async getMusic(take: number, skip: number) {
        return await this.musicServiceDb.getMusic(take, skip);
    }
}
