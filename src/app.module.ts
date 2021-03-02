import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { HeroModule } from './hero/hero.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file');
import { ConfigModule, ConfigService } from 'nestjs-config';
import path = require('path');
const format = winston.format;
const ENV = process.env.NODE_ENV || 'development';

@Module({
    imports: [
        ConfigModule.load(path.resolve(__dirname, 'config/!(*.d).{ts,js}'), {
            path: path.resolve(process.cwd(), path.join('env', `.env.${ENV}`)),
            debug: true
        }),
        WinstonModule.forRoot({
            exitOnError: false,
            format: format.combine(
                format.colorize(),
                format.timestamp({
                    format: 'HH:mm:ss YY/MM/DD',
                }),
                format.splat(),
                format.printf((info) => {
                    return `${info.timestamp} ${info.level} ${info.message}`;
                })
            ),
            transports: [
                new winston.transports.Console({
                    level: 'info',
                }),
                new DailyRotateFile({
                    filename: 'logs/application-%DATE%.log',
                    datePattern: 'YYYY-MM-DD-HH',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d',
                }),
            ],
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => {
                return config.get('database');
            },
            inject: [ConfigService],
        }),
        UsersModule,
        HealthModule,
        HeroModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('users');
    }
}
