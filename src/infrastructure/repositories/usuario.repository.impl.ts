import { callbackify } from "util";
import { RegisterUsuarioDto, UsuarioDatasource, UsuarioEntity, UsuarioRepository } from "../../domian";
import { LoginUsuarioDto } from "../../domian/dtos/auth/login-user.dto";



export class UsuarioRepositoryImpl implements UsuarioRepository{

      constructor(
            private readonly usuarioDatasource: UsuarioDatasource
      ){}
      register(registerUsuarioDto: RegisterUsuarioDto): Promise<UsuarioEntity> {
          return this.usuarioDatasource.register(registerUsuarioDto)
      }

      login(loginUsuarioDto: LoginUsuarioDto): Promise<UsuarioEntity> {
          
            return this.usuarioDatasource.login(loginUsuarioDto)
      }
}