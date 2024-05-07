import {Module} from "@nestjs/common";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {Music} from "./music.entity";
import {MusicServiceDb} from "./music.service";

@Module({
    imports: [MikroOrmModule.forFeature([Music])],
    providers: [MusicServiceDb],
    exports: [MusicServiceDb]
})
export class MusicModuleDb {}
