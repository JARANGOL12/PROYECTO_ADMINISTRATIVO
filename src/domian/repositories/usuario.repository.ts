import { LoginUsuarioDto } from "../dtos/auth/login-user.dto";
import { RegisterUsuarioDto } from "../dtos/auth/register-usuario.dto";
import { UsuarioEntity } from "../entities/usuario.entity";


export abstract class UsuarioRepository{

      // todo 

      // para login
      abstract login(loginUsuarioDto:LoginUsuarioDto):Promise<UsuarioEntity>

      abstract register(registerUsuarioDto:RegisterUsuarioDto):Promise<UsuarioEntity>
}