import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class Settings {
    @PrimaryKey()
    id: number;

    @Property()
    key: string;

    @Property()
    value: string;
}
