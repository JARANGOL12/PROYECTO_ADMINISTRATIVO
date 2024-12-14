import { CargoModel } from "../../data/mysql/models/cargo.model"
import { CargoDataSource, CargoEntity, CustomError, RegisterCargoDto } from "../../domian"
import { CargoMapper } from "../mappers/cargo.mapper"




export class CargoDataSourceImpl implements CargoDataSource{

      async register(registerCargoDto: RegisterCargoDto): Promise<CargoEntity> {
          
            const {nombre,imagen_url,descripcion}=registerCargoDto
            try {
                  const cargo= await CargoModel.create({
                        data:{
                              Nombre:nombre,
                              Imagen_url:imagen_url,
                              Descripcion:descripcion
                        }
                  })

                  // Mapear el curso creado a una entidad de dominio
                  return CargoMapper.cargoEntityFromObject(cargo)

            } catch (error) {
                  if(error){
                        if(error instanceof CustomError)
                              throw error
                  }
                  throw CustomError.internalServer()
                  
            }
      }
}