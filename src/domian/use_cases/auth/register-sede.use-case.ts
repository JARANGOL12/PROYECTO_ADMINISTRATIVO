import { RegisterSedeDto } from "../../dtos/auth/register-sede.dto";
import { SedeEntity } from "../../entities/sede.entity";
import { SedeRepository } from "../../repositories/sede.repository";



interface RegisterSedeCase{
      
      execute(registerSedeDto:RegisterSedeDto):Promise<any>

}

export class RegisterSede implements RegisterSedeCase{

      constructor(
            private readonly sedeRepository:SedeRepository
      ){}

      async execute(registerSedeDto: RegisterSedeDto): Promise<any> {
          
            const sede = await this .sedeRepository.register(registerSedeDto)

            return {
                  sede:{
                        idSede:sede.idSede,
                        nombreSede:sede.nombreSede,
                        direccion:sede.direccion,
                        telefono:sede.telefono,
                        email:sede.email
                  }
            }
      }
}