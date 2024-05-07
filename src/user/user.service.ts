import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth.service';
//SERVICE:se encarga de controlar toda la logica de la aplicacion 
//para conectarnos con la base de datos vamos a tener que tener una ORM herramienta que nos permite conectar el backend con la base de datos, nos va a simplificar las acciones sobre nuestra BDD 
//FIND: obtener datos 
@Injectable()
export class UserService {
  @InjectRepository (User)
  private userRepository : Repository <User>

  public async create(createUserDto: CreateUserDto) {//async, asincrona , quiere decir que no sigue el programa sino que lo sigue aparte 
    try {//dentro del try va a intentar ejecutar lo que tiene las lineas 18 a 20 y si alguna de las lineas lanza un error lo va a agarrar el catch: recibe el error, lo guarda y dentro de ella podemos poner la logica que querramos para solucionar ese error 
      await this.userRepository.save(createUserDto);//await le va a decir a mi programa que espere que la funcion de esta linea se resuelva. Porque generalmente las funciones que llaman a las bdd tardan unos milisegunditos mas de lo que tardaria el programa y para que esto no pase tenemos el await para que sea mas ordenado. VA DE LA MANO CON EL ASYNC
      //this es una referencia a userService . userRepository . funcion save dentro de ella guardamos el usuario que nos viene de createUserDto
      return {
      statusCode : 201,
      msg : 'El registro del usuario se realizo con exito'
    };
  }
  catch(error){
    return new BadRequestException(error); //tambien se podria poner  -return 'Hubo un error' + error- eso nos especifica el error 
  };
}
//ESTUDIAR LOS CODIGOS DE ESTADO

  public async findAll() { //aca se obtienen todos los usuarios
    try { 
      const users = await this.userRepository.find();
      console.log(users)
      if (users.length>0){
        return  users
      } else {
        return{
          "statusCode" : 400,
          "msg" : 'El usuario no exixte'
        }
      }
    } catch(error){
      return new BadRequestException(error); //tambien se podria poner  -return 'Hubo un error' + error- eso nos especifica el error 
    }
  }
//al momento de llamar a TODOS los usuarios. Los usuarios guardados en USER si la cantidad es mayor a 0 me va a devolver a todos los usuarios y si no hay ninguno me devuelve el mensaje de error




  public async findOne(id: number) { //aca se obtienen un solo usuario, el primero que encuentr. HABLANDO DEL EJEMPLO DE ABAJO SLOS PARAMETROSS SERIAN(username: string)
    try { 
      const users = await this.userRepository.findOneBy({id: id}); //Es el codigo por el que lo queremos encontrar: puede ser tambien ({username: username}) se recomienda siempre buscarlo con id porque es unico
      if (users) {//es lo mismo a (user =/=null)
        return  users
      } else {
        return{
          "statusCode" : 400,
          "msg" : 'El usuario no exixte'
        }
      }
    } catch(error){
      return new BadRequestException(error); //tambien se podria poner  -return 'Hubo un error' + error- eso nos especifica el error 
    }
  }



  public async update(id: number, newUser: UpdateUserDto) { //aca se actualiza un usuario en la bdd
    try { 
      await this.userRepository.update(id, newUser);
      return {
        "statusCode" : 200,
        "msg" : 'El usuario ha sido actualizado correctamente'
      }
    } catch(error){
      return new BadRequestException(error); //tambien se podria poner  -return 'Hubo un error' + error- eso nos especifica el error 
    }
  }



  public async remove(id: number) { //aca se remueve usuario
    try { 
      await this.userRepository.delete(id);
      return {
        "statusCode" : 200,
        "msg" : 'El usuario ha sido eliminado correctamente'
      }
    } catch(error){
      return new BadRequestException(error); //tambien se podria poner  -return 'Hubo un error' + error- eso nos especifica el error 
    }
  } 
}

//el archivo JSON son archivos con un codigo y un mensaje
//          "statusCode" : 200,
//           "msg" : 'El usuario ha sido eliminado correctamente'


