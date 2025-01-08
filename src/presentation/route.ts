import { Router } from "express"
import { CargoRoutes } from "./auth/route"
import { UsuarioController } from "./auth/usuario-controller"
import { UsuarioRoutes } from "./auth/usuario.route"
import { SedeRoutes } from "./auth/sede.route"



export class AppRouter{


      static get route():Router{
            const router =Router()

            // Definir todos Las Rutas
            router.use('/api/cargo',CargoRoutes.route)
            router.use('/api/usuario',UsuarioRoutes.route)
            router.use('/api/sede',SedeRoutes.route)

            return router
      }
}