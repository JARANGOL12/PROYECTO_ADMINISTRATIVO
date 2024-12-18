import { RegisterUsuarioDto } from "../dtos/auth/register-usuario.dto";
import { UsuarioEntity } from "../entities/usuario.entity";


export abstract class UsuarioRepository{

      // todo 

      // para login

      abstract register(registerUsuarioDto:RegisterUsuarioDto):Promise<UsuarioEntity>
}