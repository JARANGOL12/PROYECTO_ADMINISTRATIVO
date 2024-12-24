import { strict } from "assert";
import { BcryptAdapter } from "../../config/bcrypt";
import { UsuarioModel } from "../../data/mysql/models/usuario.model";
import { CustomError, RegisterUsuarioDto, UsuarioDatasource, UsuarioEntity } from "../../domian";
import { LoginUsuarioDto } from "../../domian/dtos/auth/login-user.dto";
import { UsuarioMapper } from "../mappers/usuario.mapper";



type HashFuntion =(password:string)=>string
type CompareFunction=(password:string,hashed:string)=>boolean


export class UsuarioDatasourceImpl implements UsuarioDatasource{

      constructor(
            private readonly hashPassword:HashFuntion=BcryptAdapter.hash,
            private readonly comparePassword:CompareFunction=BcryptAdapter.compare
      ){}

      async register(registerUsuarioDto:RegisterUsuarioDto):Promise<UsuarioEntity>{

            const { nombre, apellido, documento, numeroDocumento, email, nombreUsuario, password, idCargo, estado } = registerUsuarioDto;

            try {
                  // 1. Verificar si el correo existe
                 const exists = await UsuarioModel.findFirst({where:{Email:email}})
                 if(exists) throw CustomError.badRequest('Usuario alredy exits')
                  // 2. Crear el usuario
                  const usuario = await UsuarioModel.create({
                        data:{
                              Nombre:nombre,
                              Apellido:apellido,
                              Documento:documento,
                              NumeroDocumento:numeroDocumento,
                              Email:email,
                              NombreUsuario:nombreUsuario,
                              Password:this.hashPassword(password),
                              idCargo:idCargo,
                              Estado:estado



                        }
                  
                  })
            
      
                  // 3. Guardar el usuario en la base de datos
                  



                  // 3. Mappear la respuesta a nuestra entidad 

                  // todo : Falta un mapper

                  return  UsuarioMapper.usuarioEntityFromObject(usuario)

            } catch (error) {
                  if(error instanceof CustomError){
                        throw error
                  }
                  throw CustomError.internalServer()
                  
            }

      }
      async login(loginUserDto: LoginUsuarioDto): Promise<UsuarioEntity> {
          
            const {email, password}=loginUserDto
            try {
                   const usuario = await UsuarioModel.findFirst({where:{Email:email}})
                  if(!usuario) throw CustomError.badRequest('Usuario no encontrado')
                  
                 const isMatching = BcryptAdapter.compare(password, usuario.Password) 
                 if (!isMatching) {
                  throw CustomError.badRequest('Contraseña Incorrecta');
                }

                  return  UsuarioMapper.usuarioEntityFromObject(usuario)
            } catch (error) {

                     if(error instanceof CustomError){
                        throw error
                  }
                  throw CustomError.internalServer('Error interno del servidor')
            }
      }
}
