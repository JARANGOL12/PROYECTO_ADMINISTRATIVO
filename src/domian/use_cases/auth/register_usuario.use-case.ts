import { JwtAdapter } from "../../../config/jwt"
import { RegisterUsuarioDto } from "../../dtos/auth/register-usuario.dto"
import { CustomError } from "../../error/Custom.error"
import { UsuarioRepository } from "../../repositories/usuario.repository"



interface UsuarioToken{

      token:string,
      usuario:{
            idUsuario:number,
            nombre:string,
            apellido:string,
            documento:string,
            numeroDocumento:number,
            email:string,
            nombreUsuario:string,
            password:string,
            idCargo:number,
            Estado:boolean
      }
}

type usuarioToken=(payload:Object,duration?:string)=>Promise<string | null>


interface RegisterUsuarioCase{
      execute(registerUsuarioDto:RegisterUsuarioDto):Promise<any>

}
export class RegisterUsuario implements RegisterUsuarioCase{

      constructor(
            private readonly usuarioRepository:UsuarioRepository,
            private readonly usuarioToken:usuarioToken=JwtAdapter.generateToken

      ){}

      async execute(registerUsuarioDto:RegisterUsuarioDto):Promise<any>{

            // Crear Usuario

            const usuario = await this.usuarioRepository.register(registerUsuarioDto)

            // TOKEN 

            const token = await this.usuarioToken({id:usuario.idUsuario}, '2h')
            if(!token) throw CustomError.internalServer('Error Genereating Token')

          return {
            token:token,
            usuario:{
                  id:usuario.idUsuario,
                  nombre:usuario.nombre,
                  apellido:usuario.apellido,
                  documento:usuario.documento,
                  numeroDocumento:usuario.numeroDocumento,
                  email:usuario.email,
                  nombreUsuario:usuario.nombreUsuario,
                  password:usuario.password,
                  idCargo:usuario.cargo,
                  estado:usuario.estadio
            }
          }
      }
}