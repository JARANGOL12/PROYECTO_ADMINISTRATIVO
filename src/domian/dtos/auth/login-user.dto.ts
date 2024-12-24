
import { UsuarioValidators } from "../../../config/validator.usuario"



export class LoginUsuarioDto {

      constructor(
            public email: string,
            public password: string
      ) { }

      static create(object: { [key: string]: any }): [string?, LoginUsuarioDto?] {

            const { email, password } = object

            if (!email) return ['Missing email']
            if (!UsuarioValidators.email.test(email)) return ['Email Incorrecto']
            if (!password) return ['Missing Password']
            if (password.length < 6) return ['La contraseña es inconrrecta']

            return [
                  undefined,
                  new LoginUsuarioDto(email,password)
            ]
      }     
}