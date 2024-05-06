import { Injectable } from '@nestjs/common';
//la parte logica de la pagina 
// clase que se puede inyectar dentro de otra se define con el decorador @injectable
//lo que va a aparecer en la pantalla de mi pagina 

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
