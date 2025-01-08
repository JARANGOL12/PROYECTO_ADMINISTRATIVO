import { CustomError, SedeEntity } from "../../domian"



export class SedeMapper {

      static sedeEntityFromObject(object:{[key:string]:any}){

            const {idSede, NombreSede, Direccion, Telefono, Email, Imagen_Url} = object

             if(!idSede){
                  throw CustomError.badRequest('Missing id Sede')

             } 
             if(!NombreSede) throw CustomError.badRequest('Missing  name sede')
            if(!Direccion) throw CustomError.badRequest('Missing direcction')
            if(!Telefono) throw CustomError.badRequest('Missing telefono')
            if(!Email) throw CustomError.badRequest('Missing email')
            if(!Imagen_Url) throw CustomError.badRequest('Missing imagen_Url')
            
                  
                  return new SedeEntity(
                        idSede,
                        NombreSede,
                        Direccion,
                        Telefono,
                        Email,
                        Imagen_Url
                  )
      
      }
}