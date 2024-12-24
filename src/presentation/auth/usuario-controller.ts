import { Request, Response } from "express";
import { error } from "console";
import { CustomError, RegisterUsuario, RegisterUsuarioDto, UsuarioRepository } from "../../domian";
import { getSystemErrorMap } from "util";
import { json } from "stream/consumers";
import { UsuarioModel } from "../../data/mysql/models/usuario.model";
import { LoginUsuarioDto } from "../../domian/dtos/auth/login-user.dto";
import { LoginUsuario } from "../../domian/use_cases/auth/login-user.use-case";




export class UsuarioController {

    constructor(

        // Inyeccion de dependencias

        private readonly usuarioRepository: UsuarioRepository


    ) { }

    private handleError = (error: unknown, res: Response): void => {
        if (error instanceof CustomError) {
            // Manejar errores personalizados
            res.status(error.statusCode).json({ error: error.message });
        } else {
            // Manejar errores generales
            console.error('Unexpected error:', error); // Registrar el error
            res.status(500).json({ error: 'Internal server Error' });
        }
    }
    registerUsuario = async (req: Request, res: Response) => {
        const [error, registerUsuarioDto] = RegisterUsuarioDto.create(req.body)

        if (error) {
            res.status(400).json({ error })
            return
        }
          await new RegisterUsuario(this.usuarioRepository)
            .execute(registerUsuarioDto!)
            .then((data)=>res.json(data))
            .catch(error =>this.handleError(error,res))
    }
    getUsuario = async(req:Request, res:Response):Promise<void>=>{
       try {

        // Recuperar el usuario desde el middleware

        const usuario =(req as any).usuario

        // verificar que el middelewarw haay proporcionado el usuario

        if(!usuario){
            res.status(401).json({error:'Unauthoeized'})
            return
        }
         
        // consultar todos los usuarios como ejemplo
         const usuarios = await UsuarioModel.findMany()

         // devolver informacion del usuario autenticado y la lista de usuarios

         res.status(200).json({
            currentUser:usuario,
            allUser:usuarios
         })
       } catch (error) {
        res.status(500).json({error: 'Internal Sever error'})
        
       }
    }
    loginUsuario = async (req:Request, res:Response)=>{
        const [error, loginUserDto] =LoginUsuarioDto.create(req.body);
            
        if (error) {
          res.status(400).json({ error });
          return;
        }
    
        await new LoginUsuario(this.usuarioRepository)
        .execute(loginUserDto!)
        .then((data)=>res.json(data))
        .catch(error =>this.handleError(error,res)) 
    }
    
}
