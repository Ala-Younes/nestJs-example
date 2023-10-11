import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import CustomErrorPipe from './utils/validator-error-handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(CustomErrorPipe);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
