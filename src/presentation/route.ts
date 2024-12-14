import { Router } from "express"
import { CargoRoutes } from "./auth/route"



export class AppRouter{


      static get route():Router{
            const router =Router()

            // Definir todos Las Rutas
            router.use('/api/cargo',CargoRoutes.route)

            return router
      }
}