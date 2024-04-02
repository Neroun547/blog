import { Injectable } from "@nestjs/common";
import {InjectRepository} from "@mikro-orm/nestjs";
import {Settings} from "./settings.entity";
import {EntityRepository} from "@mikro-orm/mysql";

@Injectable()
export class SettingsServiceDb {
    constructor(@InjectRepository(Settings) private repository: EntityRepository<Settings>) {}

    async updateSettingByKey(key: string, value: string) {
        await this.repository.nativeUpdate({ key: key }, { value: value });
    }
    async getSettingByKey(key: string) {
        return await this.repository.findOne({ key: key });
    }
}
