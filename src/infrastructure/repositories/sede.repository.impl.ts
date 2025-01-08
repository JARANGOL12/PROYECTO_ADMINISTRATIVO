import { RegisterSedeDto, SedeDatasource, SedeEntity, SedeRepository } from "../../domian";



export class SedeRepositoryImpl implements SedeRepository{

      constructor(

            private readonly sededatasource:SedeDatasource
      ){}

         // Método para  buscar una sede por ID
      findOneById(idSede: number): Promise<SedeEntity | null> {
            return this.sededatasource.findOneById(idSede)
      }

        // Método para obtner todas las listas de sedes 
      findALL(): Promise<SedeEntity[]> {
            return this.sededatasource.findALL()
      }

       
       // Método para actulizar una sede
      updateSede(idSede: number, updateSedeDto: RegisterSedeDto): Promise<SedeEntity> {
            return this.sededatasource.updateSede(idSede,updateSedeDto)
      }
      
       // Metodo para eliminar logicamente un sede
      deleteSede(idSede: number): Promise<void> {
            return this.sededatasource.deleteSede(idSede)  
      }

      // Metodo para registrar una sede
     async  register(registerSedeDto:RegisterSedeDto):Promise<SedeEntity>{
            return this.sededatasource.register(registerSedeDto)
       }
       

    
     

   
      
      




}