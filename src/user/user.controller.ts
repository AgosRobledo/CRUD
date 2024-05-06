import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user') //decorador controller en la ruta users, cuando abramos user se nos van a abrer todas estas rutas:
export class UserController {
  constructor(private readonly userService: UserService) {} //va a importar el servivio que tenemos en el apartado izquierdo user.service.ts

  @Post()//ruta: para crear
  public async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()//ruta:llamar/obtener a lo general (obtenemos todo)
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')//ruta: llamar/obtener por id (obtenemos algo especifico)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')//ruta:actualizar
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')//ruta:eliminar 
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
