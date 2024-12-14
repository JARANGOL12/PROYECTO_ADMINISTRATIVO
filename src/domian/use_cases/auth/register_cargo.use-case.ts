import { RegisterCargoDto } from "../../dtos/auth/register-cargo.dto"
import { CargoRepository } from "../../repositories/cargo.repository"




interface RegisterCargoCase{

      execute(registerCargoDto:RegisterCargoDto):Promise<any>
}

export class RegisterCargo implements RegisterCargoCase{
     
      constructor(
        private readonly cargoRepository:CargoRepository
      ){}

      async execute(registerCargoDto: RegisterCargoDto): Promise<any> {
          
            const cargo= await this.cargoRepository.register(registerCargoDto)


            return {
                  cargo:{
                        id:cargo.id,
                        nombre:cargo.nombre,
                        imagen_Url:cargo.imagen_url,
                        descripcion:cargo.descripcion
                  }
            }
      }
}