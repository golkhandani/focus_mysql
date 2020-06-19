import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoolOptions, NestMysqlModule } from './nest-mysql';


const connectionOptions : PoolOptions = {
  host:'localhost',
  port: 3306,
  user: 'root',
  password:'example',
  database: 'test'
}

@Module({
  imports: [
    NestMysqlModule.register({
      connectionType:'pool',
      connectionOptions,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
