import { User } from '../entities/user.entity';

export default {
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    port: parseInt(process.env.TYPEORM_PORT),
    logging: process.env.TYPEORM_LOGGING === 'true',
    // entities: ['src/**/*.entity.ts'],
    autoLoadEntities: true,
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
};