import {Module} from "@nestjs/common";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {UserDislikes} from "./user-dislikes.entity";
import {UserDislikesServiceDb} from "./user-dislikes.service";

@Module({
    imports: [MikroOrmModule.forFeature([UserDislikes])],
    providers: [UserDislikesServiceDb],
    exports: [UserDislikesServiceDb]
})
export class UserDislikesModuleDb {}
