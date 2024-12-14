import { RegisterCargoDto } from "../dtos/auth/register-cargo.dto";
import { CargoEntity } from "../entities/cargo.entity";


export abstract class CargoRepository{



      abstract register(registerCargoDto:RegisterCargoDto):Promise<CargoEntity>
}