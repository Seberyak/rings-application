import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { JsonService } from './json.service';

@Module({
  imports: [InMemoryDBModule.forRoot({})],
  controllers: [AppController],
  providers: [AppService, JsonService],
})
export class AppModule {}
