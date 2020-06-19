import { PoolOptions } from "mysql2";
import { ConnectionOptions } from "mysql2";

export interface INestMysqlOptions {
    connectionType:'pool' | 'connection'
    connectionOptions : PoolOptions | ConnectionOptions,
    initOptions?: {
        promise: boolean
    }
}