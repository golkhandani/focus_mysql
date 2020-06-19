import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { NestMysqlService } from './nest-mysql.service';
import { NEST_MYSQL_OPTIONS } from './constants';
import { connectionFactory } from './nest-mysql.connection';
import { createNestMysqlProviders } from './nest-mysql.provider';
import { INestMysqlOptions } from './interfaces/register-options';

@Global()
@Module({
  providers: [NestMysqlService, connectionFactory],
  exports: [NestMysqlService, connectionFactory],
})
export class NestMysqlModule {

  public static register(options:INestMysqlOptions): DynamicModule {
    return {
      module: NestMysqlModule,
      providers: createNestMysqlProviders(options),
    };
  }


  public static registerAsync(
    options,
  ): DynamicModule {
    return {
      module: NestMysqlModule,
      providers: [...this.createProviders(options)],
      imports: options.imports || [],
    };
  }

  private static createProviders(
    options,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createOptionsProvider(options)];
    }

    return [
      this.createOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createOptionsProvider(
    options,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: NEST_MYSQL_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // For useExisting...
    return {
      provide: NEST_MYSQL_OPTIONS,
      useFactory: async (optionsFactory) =>
        await optionsFactory.createNestMysqlOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}