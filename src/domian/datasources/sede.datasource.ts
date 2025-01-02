import { RegisterSedeDto } from "../dtos/auth/register-sede.dto";
import { SedeEntity } from "../entities/sede.entity";





export abstract class SedeDatasource{

  abstract register(registerSedeDto:RegisterSedeDto):Promise<SedeEntity>
}