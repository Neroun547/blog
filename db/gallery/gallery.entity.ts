import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity()
export class Gallery {
    @PrimaryKey()
    id: number;

    @Property()
    description: string;

    @Property()
    file_name: string;

    @Property()
    date: Date | string;
}

