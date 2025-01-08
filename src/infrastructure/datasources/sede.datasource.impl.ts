
import { SedeModel } from "../../data/mysql/models/sede.model";
import { CustomError, RegisterSedeDto, SedeDatasource, SedeEntity } from "../../domian";
import { error } from "console";
import { SedeMapper } from "../mappers/sede.mapper";



export class SedeDatasourceImpl implements SedeDatasource{

      // implementacion del método para buscar una sede por ID
     async findOneById(idSede: number): Promise<SedeEntity| null> {
         
            try {
                  const sede = await SedeModel.findUnique({
                        where :{idSede},
                  })
                  return sede ? SedeMapper.sedeEntityFromObject(sede): null
            } catch (error) {
                 throw CustomError.badRequest(`Error Fetching Sede With ID ${idSede} `)
            }
      }

      //Implementacion del método para obtener todas las sedes 
      async findALL(): Promise<SedeEntity[]> {
          
            try {
                  const sedes = await SedeModel.findMany()
                  return sedes.map(SedeMapper.sedeEntityFromObject)

                  
            } catch (error) {
                  throw CustomError.badRequest('Error fetching all sede')

                  
            }

            // Implementación del método para actualizar una sede
      }
      async updateSede(idSede: number, updateSedeDto:RegisterSedeDto): Promise<SedeEntity> {
           
            const {nombreSede, direccion, telefono, email, imagen_Url}= updateSedeDto
         try {
             const updateSede = await SedeModel.update({
                  where: {idSede},
                  data:{
                        NombreSede:nombreSede,
                        Direccion:direccion,
                        Telefono:telefono,
                        Email:email,
                        Imagen_Url:imagen_Url
                        
                  }
             })

             return SedeMapper.sedeEntityFromObject(updateSede)
         } catch (error) {
            throw  CustomError.badRequest(`Error updating Sede with ID ${idSede}`)
            
         }
            
      }
      deleteSede(idSede: number): Promise<void> {
            throw new Error("Method not implemented.");
      }
    

      async register(registerSedeDto: RegisterSedeDto): Promise<SedeEntity> {
          
            const {nombreSede,direccion,telefono,email,imagen_Url} = registerSedeDto

            try {
                  const sede = await SedeModel.create({
                   data:{
                        NombreSede:nombreSede,
                        Direccion:direccion,
                        Telefono:telefono,
                        Email:email,
                        Imagen_Url:imagen_Url
                        
                   }     
                  })
                  // Mapper 

                  return SedeMapper.sedeEntityFromObject(sede)
            } catch (e){
                  if(e instanceof CustomError){
                        throw error
                  }
                  throw CustomError.internalServer
            }
            
            
      }
}