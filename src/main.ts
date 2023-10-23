import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const PORT = process.env.PORT || 4444;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('test Nest')
    .setDescription('BE for exchange')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
}
bootstrap();
