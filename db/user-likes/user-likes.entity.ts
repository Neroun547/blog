import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class UserLikes {
    @PrimaryKey()
    id: number;

    @Property()
    key: string;

    @Property()
    article_id: number;
}
