import {Injectable, InternalServerErrorException} from "@nestjs/common";
import {UploadMusicDto} from "../dto/upload-music.dto";
import {MusicServiceDb} from "../../../../db/music/music.service";
import {createHmac} from "crypto";
import {unlink, writeFile} from "fs/promises";
import {resolve} from "path";

@Injectable()
export class MusicService {
    constructor(private musicServiceDb: MusicServiceDb) {}

    async saveMusic(fileBuffer: Buffer, musicData: UploadMusicDto) {
        const fileHash = createHmac("sha256", String(Date.now() + Math.floor(Math.random() * 1000))).digest("hex");

        await writeFile(resolve("static/uploaded-music/" + fileHash + ".mp3" ), fileBuffer);

        await this.musicServiceDb.saveMusic({
            file_name: fileHash  + ".mp3",
            genre: musicData.genre,
            name: musicData.name,
            author: musicData.author
        });
    }
    async getMusic(take: number, skip: number) {
        return this.musicServiceDb.getMusic(take, skip);
    }
    async deleteMusic(id: number) {
        const musicInDb = await this.musicServiceDb.getMusicById(id);

        try {
            unlink(resolve("static/uploaded-music/" + musicInDb.file_name));
        } catch(e) {
            throw new InternalServerErrorException();
        }
        await this.musicServiceDb.deleteMusicById(id);
    }
}
