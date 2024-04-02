import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class Users {
    @PrimaryKey()
    id: number;

    @Property()
    username: string;

    @Property()
    password: string;
}

