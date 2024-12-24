import { LoginUsuarioDto } from "../dtos/auth/login-user.dto";
import { RegisterUsuarioDto } from "../dtos/auth/register-usuario.dto";
import { UsuarioEntity } from "../entities/usuario.entity";




export abstract class UsuarioDatasource{

      // todo
      //abstract login(loginUserDto: LoginUserDto)

       abstract login(loginUserDto:LoginUsuarioDto):Promise<UsuarioEntity>

      abstract register(registerUsuarioDto:RegisterUsuarioDto):Promise<UsuarioEntity>
}