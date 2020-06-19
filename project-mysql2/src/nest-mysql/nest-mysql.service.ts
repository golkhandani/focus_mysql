import { Injectable, Logger, Inject } from "@nestjs/common";
import { NEST_MYSQL_OPTIONS } from "./constants";
import { INestMysqlOptions } from './interfaces/register-options';
import * as mysql2 from 'mysql2/promise';
import { from } from "rxjs";
@Injectable()
export class NestMysqlService {
    private readonly logger: Logger;
    private _mysqlConnection: mysql2.Connection;
    private _mysqlPool: mysql2.Pool;

    constructor(
        @Inject(NEST_MYSQL_OPTIONS) 
        private _NestMysqlOptions:INestMysqlOptions,){
            this.logger = new Logger('NestMysqlService');
        }
    
    async getMysql(): Promise<mysql2.Connection | mysql2.Pool> {
        if(!this._mysqlConnection) {
            if(this._NestMysqlOptions.connectionType == 'pool') {
                console.log('pool')
                this._mysqlPool = await mysql2.createPool(this._NestMysqlOptions.connectionOptions);
            }
            else {
                this._mysqlConnection = await mysql2.createConnection(this._NestMysqlOptions.connectionOptions);
            }
        };
        return this._mysqlConnection || this._mysqlPool;
    }

}