import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class UserDislikes {
    @PrimaryKey()
    id: number;

    @Property()
    key: string;

    @Property()
    article_id: number;
}
