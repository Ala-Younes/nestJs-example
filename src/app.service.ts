import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  isServerRunning(): string {
    const port = this.configService.get<string>('PORT');
    if (port) {
      return `Application running on port ${port}`;
    } else {
      return 'Error: Application Port is not defined';
    }
  }
}
