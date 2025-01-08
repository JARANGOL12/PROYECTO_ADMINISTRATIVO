import { Router } from "express";
import { SedeDatasourceImpl, SedeRepositoryImpl } from "../../infrastructure";
import { sedeController } from "./sede-controller";


export class SedeRoutes {

      static get route():Router{
            
            const router= Router()

            const datasource = new SedeDatasourceImpl()

            const sedeRepository = new SedeRepositoryImpl(datasource)
            
            const controller = new sedeController(sedeRepository)

            // definir todas la rutas principales

            router.get('/',controller.findALL)
            router.get('/:id',controller.findOneById)
            router.post('/register',controller.registerSede)
            router.put('/update/:id', controller.updateSede);






            return router
      }
}