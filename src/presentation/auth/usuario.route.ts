import { Router } from "express";
import { UsuarioDatasourceImpl, UsuarioRepositoryImpl } from "../../infrastructure";
import { UsuarioController } from "./usuario-controller";
import { UsuarioMiddleware } from "../middlewares/usuario.middelware";





export class UsuarioRoutes {

      static get route():Router{

            const router =Router()

            const datasource = new UsuarioDatasourceImpl()

            const usuarioRepository = new UsuarioRepositoryImpl(datasource)

            const constroller= new UsuarioController(usuarioRepository)


            // definir todos mis rutas priincipales 

            router.post('/register',constroller.registerUsuario)
            router.get('/',UsuarioMiddleware.validateJWT,constroller.getUsuario)
            router.post('/login',constroller.loginUsuario)

            return router
      }
}