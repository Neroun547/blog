import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {MusicInterface} from "./interfaces/music.interface";

@Entity()
export class Music implements MusicInterface {
    @PrimaryKey()
    id: number;

    @Property()
    name: string;

    @Property()
    author: string;

    @Property()
    genre: string;

    @Property()
    file_name: string;
}
