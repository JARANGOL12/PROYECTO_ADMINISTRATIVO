import { RegisterSedeDto } from "../dtos/auth/register-sede.dto";
import { SedeEntity } from "../entities/sede.entity";


export abstract class SedeRepository{
      
      abstract register(registerSedeDto:RegisterSedeDto):Promise<SedeEntity>
      abstract findOneById(idSede:number):Promise<SedeEntity | null>
      abstract findALL():Promise<SedeEntity[]>
      abstract updateSede(idSede: number, updateSedeDto: RegisterSedeDto): Promise<SedeEntity>;
      abstract deleteSede(idSede:number):Promise<void>  
    }

