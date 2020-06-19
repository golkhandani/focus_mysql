import { Injectable, Inject } from '@nestjs/common';
import { NEST_MYSQL_CONNECTION, IMysqlConnection } from './nest-mysql';
import { readFileSync } from 'fs';

@Injectable()
export class AppService {
  constructor(
    @Inject(NEST_MYSQL_CONNECTION) private readonly connection: IMysqlConnection
  ){}

  getHello(): string {
    return 'Hello World!';
  }
  async testDb() {
    const x = await this.connection.execute('CALL add_new_user(?)',['raheleh'])
    console.log(x);
    const [rows,fields] = await this.connection.query('SELECT * FROM users;',[1]);
    return rows;
  }
}
