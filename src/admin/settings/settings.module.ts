import { Module } from "@nestjs/common";
import {SettingsControllerAdmin} from "./settings.controller";
import {SettingsModuleDb} from "../../../db/settings/settings.module";

@Module({
    imports: [SettingsModuleDb],
    controllers: [SettingsControllerAdmin]
})
export class SettingsModuleAdmin {}
