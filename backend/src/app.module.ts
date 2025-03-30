import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { OrderModule } from './order/order.module';
import { PackageModule } from './package/package.module';
import { CourierModule } from './courier/courier.module';
import databaseConfig from './config/database.config';
import { validationSchema } from './config/config.validation';
import { DeliveryModule } from './delivery/delivery.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UtilsModule } from './utils/utils.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
      serveRoot: '/',
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
      validationSchema,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('database.host'),
        port: +configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        autoLoadModels: true,
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    OrderModule,
    PackageModule,
    CourierModule,
    DeliveryModule,
    UtilsModule,
    CityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
