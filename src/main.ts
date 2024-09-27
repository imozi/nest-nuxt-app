import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app/app.module';
import { EnvironmentService } from '@/app/config/environment';
import { LoggerService } from '@/app/config/logger';
import { LoggingInterceptor } from '@/interceptors/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get(LoggerService);
  const environments = app.get(EnvironmentService);
  const globalPrefix = environments.get('PREFIX');
  const port = environments.get('PORT');
  const cors = environments.get('CORS');

  app.enableCors({
    origin: cors,
  });

  app.useLogger(logger);
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  app.setGlobalPrefix(globalPrefix);

  await app
    .listen(port)
    .then(() =>
      logger.info(
        `🚀 Сервер успешно запущен на порту ${port} и доступен по адресу: http://localhost:${port}/${globalPrefix}`,
      ),
    );
};

bootstrap();
