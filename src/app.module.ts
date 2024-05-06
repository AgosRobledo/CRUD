import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
//paquetes donde vamos a ejecutar nuestra pagina. todos los imputs, modulos, controllers. 
//los controlers se encargan de ejecutar las peticiones get, post, put, patvh, delete. maneja las rutas, se encarga de lo que hace cada una atraves de controladores 
//@lo que tiene arroba son -decoradores- 
//vincula en una caja
//modulo alejo, tiene el server 
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [User],
      synchronize: true,
  }),UserModule], //importa los modulos de usuario
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
