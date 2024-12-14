import { ValidadorCargo } from "../../../config"


export class RegisterCargoDto{


      private constructor(
            public nombre:string,
            public imagen_url:string,
            public descripcion:string
      ){}

      static create(object:{[key:string]:any}):[string?,RegisterCargoDto?]{

            const {nombre,imagenUrl,descripcion} =object

            if(!nombre) return ['Missing name']
            if(!imagenUrl) return['Missing Imagen']
            if(!ValidadorCargo.imagen_Url.test(imagenUrl)) return ['Imagen is Not Valid']
            if(!descripcion) return ['Missing Description']
            if(!ValidadorCargo.descripcion.test(descripcion)) return ['Description es demasiodo Corto']

            return[
                  undefined,
                  new RegisterCargoDto(nombre,imagenUrl,descripcion)
            ]
      }
}