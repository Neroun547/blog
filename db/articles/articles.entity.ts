import {Collection, Entity, OneToMany, PrimaryKey, Property} from "@mikro-orm/core";
import {ArticlesInterface} from "./interfaces/articles.interface";
import {UserLikes} from "../user-likes/user-likes.entity";

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

    @OneToMany({ entity: () => UserLikes, mappedBy: "article" })
    userLikes: Collection<UserLikes>;
}

