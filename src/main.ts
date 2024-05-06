import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//se crea el modulo nest
//
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);//puerto por defecto, ir a navegador poner local host 3000
}
bootstrap();
