import {Module} from "@nestjs/common";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {Gallery} from "./gallery.entity";
import {GalleryServiceDb} from "./gallery.service";

@Module({
    imports: [MikroOrmModule.forFeature([Gallery])],
    providers: [GalleryServiceDb],
    exports: [GalleryServiceDb]
})
export class GalleryModuleDb {}
