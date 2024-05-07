import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth.service';


@Controller('user') //decorador controller en la ruta users, cuando abramos user se nos van a abrer todas estas rutas:va a escuchar las ordenes que le vamos a dar 
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {} //va a importar el servivio que tenemos en el apartado izquierdo user.service.ts

  @Post()//ruta: para crear
  public async create(@Body() createUserDto: CreateUserDto) { //body, lo que viene después es el cuerpo del 
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

  @Post('register')
  async register(@Body() body: any) {
    const hashedPassword = await this.authService.hashPassword(body.pass);
    // Guardar el usuario en la base de datos con la contraseña cifrada
    const { username, HashedPassword } = body;
	return { message: 'Usuario registrado correctamente' };
  }


  @Post('login')
  async login(@Body() body: any) {
    const { username, password } = body;
    // Buscar el usuario en la base de datos y comparar las contraseñas
    // Devolver token de autenticación si las contraseñas coinciden
  }
}
