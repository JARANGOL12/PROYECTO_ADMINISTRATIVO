import { JwtAdapter } from "../../../config/jwt"
import { LoginUsuarioDto } from "../../dtos/auth/login-user.dto"
import { CustomError } from "../../error/Custom.error"
import { UsuarioRepository } from "../../repositories/usuario.repository"



interface UsuarioToken{

      token:string,
      usuario:{
            idUsuario:number,
            nombre:string,
            email:string,
           
      }
}

type usuarioToken=(payload:Object,duration?:string)=>Promise<string | null>


interface LoginUsuarioCase{
      execute(loginUsuarioDto:LoginUsuarioDto):Promise<any>

}
export class LoginUsuario implements LoginUsuarioCase{

      constructor(
            private readonly usuarioRepository:UsuarioRepository,
            private readonly usuarioToken:usuarioToken=JwtAdapter.generateToken

      ){}

      async execute(loginUsuarioDto:LoginUsuarioDto):Promise<any>{

            // Crear Usuario

            const usuario = await this.usuarioRepository.login(loginUsuarioDto)

            // TOKEN 

            const token = await this.usuarioToken({id:usuario.idUsuario}, '2h')
            if(!token) throw CustomError.internalServer('Error Genereating Token')

          return {
            token:token,
            usuario:{
                  id:usuario.idUsuario,
                  nombre:usuario.nombre,
                  email:usuario.email
            }
          }
      }
}