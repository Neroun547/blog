import { Module } from "@nestjs/common";
import {AboutAndFeedbackController} from "./about-and-feedback.controller";

@Module({
    controllers: [AboutAndFeedbackController]
})
export class AboutAndFeedbackModule {}
