
import { NEST_MYSQL_OPTIONS } from './constants';
import { INestMysqlOptions } from './interfaces/register-options';

export function createNestMysqlProviders(options: INestMysqlOptions) {
  return [
    {
      provide: NEST_MYSQL_OPTIONS,
      useValue: options,
    },
  ];
}