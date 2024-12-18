import { RegisterUsuarioDto } from "../dtos/auth/register-usuario.dto";
import { UsuarioEntity } from "../entities/usuario.entity";




export abstract class UsuarioDatasource{

      // todo
      //abstract login(loginUserDto: LoginUserDto)
      abstract register(registerUsuarioDto:RegisterUsuarioDto):Promise<UsuarioEntity>
}