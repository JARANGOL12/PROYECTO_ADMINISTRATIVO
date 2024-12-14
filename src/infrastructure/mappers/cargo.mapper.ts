import { CargoEntity, CustomError } from "../../domian"



export class CargoMapper{

      static cargoEntityFromObject(object:{[key:string]:any}){
           
            const {idCargo,Nombre,Imagen_url,Descripcion}=object
            
            if(!idCargo){
                  throw CustomError.badRequest('Missing id')
            }
            if(!Nombre) throw CustomError.badRequest('Missing Name')
            if(!Imagen_url) throw CustomError.badRequest('Missing Imagen_Url')
            if(!Descripcion) throw CustomError.badRequest('Missing Descripcion')
                  return new CargoEntity(
                        idCargo,  // idCargo será manejado por la base de datos (autoincrement)
                        Nombre,
                        Imagen_url,
                        Descripcion
                      );
      }
}