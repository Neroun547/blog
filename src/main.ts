import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { resolve } from "path";
import { engine } from "express-handlebars";
import {ValidationPipe} from "@nestjs/common";
import { HttpExceptionFilter } from "../error-filter/error-filter";
import * as cookieParser from "cookie-parser";
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule);

  app.use(express.urlencoded({limit: '50mb', extended: true}));

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useStaticAssets(resolve( "static"));
  app.setBaseViewsDir(resolve( "views"));
  app.setViewEngine("hbs");

  app.use(cookieParser());

  app.engine("hbs", engine({
    extname: "hbs",
    partialsDir: resolve( "views/partials")
  }));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(Number(process.env.APP_PORT));
}
bootstrap();
