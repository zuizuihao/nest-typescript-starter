import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcClientOptions } from './grpc-client.options';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: true,
    });
    const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER);
    //全局的logger
    app.useLogger(nestWinston);
    // 异常拦截写入日志
    app.useGlobalFilters(new HttpExceptionFilter(nestWinston.logger));

    app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
    await app.startAllMicroservicesAsync();
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
