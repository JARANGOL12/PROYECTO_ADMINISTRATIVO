import { SedeValidators } from "../../../config/validator.sede"




export class RegisterSedeDto {

      private constructor(

           public nombreSede:string,
           public direccion:string,
           public telefono:string,
           public email:string


      ){}

      static create(object: {[key: string]:any}) : [string?, RegisterSedeDto?]{
            const {nombreSede, direccion, telefono, email} =object

            if(!nombreSede) return ['Missing nombre de sede']
            if(!direccion) return ['Missing direccion']
            if(!telefono) return ['missing telefono']
            if(!SedeValidators.email.test(email)) return ['Email is not valid']
            
            return [
                  undefined,
                  new RegisterSedeDto(nombreSede,direccion,telefono,email)
            ]
      }
}