import { NEST_MYSQL_CONNECTION } from './constants';
import { NestMysqlService } from './nest-mysql.service';

export const connectionFactory = {
  provide: NEST_MYSQL_CONNECTION,
  useFactory: async (nestMysqlService:NestMysqlService) => {
    return await nestMysqlService.getMysql();
  },
  inject: [NestMysqlService],
};