//ENTiTY:simula una tabla de la base de datos, nombre user. Acá van a estra todos los atributos de las tablas
import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity ({
    name: 'user'
})
export class User {
    @PrimaryGeneratedColumn({//hace referencia a la clave primaria que es autogenerada en este caso va a ser id
        type: 'int',
        name:'id'
    })
    id: number;
    @Column('varchar',{
        name:'user',
    })
    user: string;
    @Column('varchar',{
        name:'pass',
    })
    pass:string
}
