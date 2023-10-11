import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/environment.validation';
import { BooksModule } from './books/books.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.dev.env', '.env'],
      isGlobal: true,
      validate,
    }),
    BooksModule,
    PrismaModule,
  ],
})
export class AppModule {}
