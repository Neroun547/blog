import {Entity, PrimaryKey, Property} from "@mikro-orm/core";
import {ArticlesInterface} from "./interfaces/articles.interface";

@Entity()
export class Articles implements ArticlesInterface {
    @PrimaryKey()
    id: number;

    @Property()
    name: string;

    @Property()
    theme: string;

    @Property()
    file_name: string;

    @Property()
    date: Date | string;

    @Property()
    likes: number;

    @Property()
    dislikes: number;
}

