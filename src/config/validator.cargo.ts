
export class ValidadorCargo{

      // Esquema de validacion con Zod


      static get nombre(){
            return /^[a-zA-Z\s]{3,}$/
      }
       
      static get imagen_Url() {
            return /^(https?:\/\/.*\.(?:jpg|jpeg))$/i;
        }
        
      static get descripcion(){
            return /^.{10,}$/
      }
}