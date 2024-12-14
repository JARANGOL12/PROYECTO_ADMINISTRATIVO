import { CargoDataSource, CargoEntity, CargoRepository, RegisterCargoDto } from "../../domian";



export class CargoRepositoryImpl implements CargoRepository{

      constructor(
            private readonly cargodatasource:CargoDataSource

      ){}

      register(registerCargoDto: RegisterCargoDto): Promise<CargoEntity> {
          return this.cargodatasource.register(registerCargoDto)
      }
}