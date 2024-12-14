import { Router } from "express"
import { CargoDataSourceImpl, CargoRepositoryImpl } from "../../infrastructure"
import { Controller } from "./controller"



export class CargoRoutes{

      static get route():Router{

            const router=Router()
            const datasource = new CargoDataSourceImpl()

            const cargoRepository = new CargoRepositoryImpl(datasource)

            const controller = new Controller(cargoRepository)

             // Definir todos mis rutas principales 
             router.post('/register',controller.registerCargo)
             router.get('/',controller.getAllCargo)
             

             return router
      }
}