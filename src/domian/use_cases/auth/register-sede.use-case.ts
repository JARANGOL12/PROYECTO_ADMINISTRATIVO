import { inflate } from "zlib";
import { RegisterSedeDto } from "../../dtos/auth/register-sede.dto";
import { SedeEntity } from "../../entities/sede.entity";
import { CustomError } from "../../error/Custom.error";
import { SedeRepository } from "../../repositories/sede.repository";

interface RegisterSedeCase {

      execute(registerSedeDto: RegisterSedeDto): Promise<any>

}

interface FindSedeByIdCase {
      execute(idSede: number): Promise<SedeEntity | null>
}

interface FindAllSedesCase {
      execute():Promise<SedeEntity[]>
}
interface updateSedeCase {

      execute(idSede:number,updateSedeDto:RegisterSedeDto):Promise<SedeEntity>

}

interface DeleteSedeCase {

      execute(idSede:number):Promise<void>
}


 

export class RegisterSede implements RegisterSedeCase {

      constructor(
            private readonly sedeRepository: SedeRepository
      ) { }

      async execute(registerSedeDto: RegisterSedeDto): Promise<any> {

            const sede = await this.sedeRepository.register(registerSedeDto)

            return {
                  sede: {
                        idSede: sede.idSede,
                        nombreSede: sede.nombreSede,
                        direccion: sede.direccion,
                        telefono: sede.telefono,
                        email: sede.email,
                        imagen_Url: sede.imagen_Url
                  }
            }
      }
}

export class FindSedeById implements FindSedeByIdCase {
      constructor(
            private readonly sedeRepository: SedeRepository
      ) { }

      async execute(idSede: number): Promise<SedeEntity | null> {

            const sede = await this.sedeRepository.findOneById(idSede)

            if (!sede) {
                  throw CustomError.badRequest(`Sede qith ID ${idSede} not found`)
            }

            return sede
      }
}

export class FindAllSedes implements FindAllSedesCase {

      constructor(
            private readonly sedeRepository:SedeRepository
      ){}

      async execute(): Promise<SedeEntity[]> {
          
            return this.sedeRepository.findALL()
      }
}

export class UpdateSede implements updateSedeCase{
      constructor(
            private readonly sedeRepository:SedeRepository
      ){}

      async execute(idSede: number, updateSedeDto: RegisterSedeDto): Promise<SedeEntity> {
          
        const existingSede = await this.sedeRepository.findOneById(idSede)
        
        if(!existingSede){
            throw CustomError.badRequest(`Sede with ID ${idSede} no found`)

        }
         return this.sedeRepository.updateSede(idSede,updateSedeDto)
      }
}

export class DeleteSede implements DeleteSedeCase {

      constructor( 
            private readonly sedeRepository:SedeRepository
      ){}

      async execute(idSede: number): Promise<void> {
          const sedes = await this.sedeRepository.findOneById(idSede)

          if(!sedes){
            throw CustomError.badRequest(`Sede with ID ${idSede} not found`)
          }
      }
}
