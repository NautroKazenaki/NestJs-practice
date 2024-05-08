import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './catsPage/cats.controller';
import { CatsService } from './catsPage/cats.service';
import { CatsModule } from './catsPage/cats.module';
import { LoggerMiddleware } from './catsPage/common/middleware/logger.middleware';
import { RolesGuard } from './catsPage/common/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [CatsModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)'
      )
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
