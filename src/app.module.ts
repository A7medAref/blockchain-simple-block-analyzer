import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BlockModule } from "./block/block.module";
import { HealthModule } from "./health/health.module";
import envVarsSchema from "./libs/config/validate-config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envVarsSchema,
    }),
    BlockModule,
    HealthModule,
  ],
})
export class AppModule {}
