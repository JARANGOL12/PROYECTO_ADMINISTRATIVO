import { Request, Response } from 'express'
import { CargoRepository, CustomError, RegisterCargo, RegisterCargoDto } from "../../domian"
import { CargoModel } from '../../data/mysql/models/cargo.model'



export class Controller {

      constructor(
            // inyeccion de dependencias
            private readonly cargoRepository: CargoRepository
      ) { }

      private handError = (error: unknown, res: Response) => {
            if (error instanceof CustomError) {
             return res.status(error.statusCode).json({ error: error.message })
            }else{
                  console.error('Unexpected error', error)
                  return res.status(500).json({ error: 'Internal server Error' })
            
            }

      }
      getAllCargo = async (req:Request, res:Response):Promise<void>=>{
            try {
                  const cargo = await CargoModel.findMany()

                  if(cargo.length===0){
                        res.status(400).json({message:'No se encontraron cargos'})
                        return
                  }
                  res.json({cargo})
            } catch (error) {
                  res.status(500).json({error:'Internal server error'})
            }
      }
      registerCargo = async (req: Request, res: Response) => {
           
            const [error, registerCargoDto] = RegisterCargoDto.create(req.body)
            if (error) {
                  res.status(400).json({ error })
                  return
            }
            new RegisterCargo(this.cargoRepository)
                  .execute(registerCargoDto!)
                  .then((data) => res.json(data))
                  .catch(error => this.handError(error, res))
      }
}