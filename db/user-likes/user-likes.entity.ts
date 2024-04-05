import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {Articles} from "../articles/articles.entity";

@Entity()
export class UserLikes {
    @PrimaryKey()
    id: number;

    @Property()
    key: string;

    @Property()
    article_id: number;

    @ManyToOne({ entity: () => Articles })
    article: Articles;
}
