import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SchemaService } from './schema/schema.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  app.enableShutdownHooks();

  const logger = new Logger();

  const schemaService = app.get(SchemaService);
  const configService = app.get(ConfigService);

  let next = 0;

  do {
    logger.log('Getting schema from ' + next);
    const body = await schemaService.getSchemaItems(next);
    const result = body.result;

    if (result.status != 1) {
      throw new Error(result.note);
    }

    const chunkSize = configService.get<number>('chunkSize');
    for (let i = 0, j = result.items.length; i < j; i += chunkSize) {
      const arrayChunk = result.items.slice(i, i + chunkSize);
      logger.log('Saving ' + arrayChunk.length + ' item(s)...');
      await schemaService.saveSchemaItems(arrayChunk);
    }

    next = result.next;
  } while (next);

  logger.log('Done');

  await app.close();
}
bootstrap();
