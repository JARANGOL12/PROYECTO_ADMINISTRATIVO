export class SedeValidators {

      static get  email(){
            return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
      }

      static get Imagen_Url() {
            return /\.jpg$/i
        }
       
}