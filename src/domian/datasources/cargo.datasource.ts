import { RegisterCargoDto } from "../dtos/auth/register-cargo.dto";
import { CargoEntity } from "../entities/cargo.entity";



export abstract class CargoDataSource{


      abstract register(registerCargoDto:RegisterCargoDto):Promise<CargoEntity>
}

