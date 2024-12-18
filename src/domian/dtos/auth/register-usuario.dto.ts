import { UsuarioValidators } from "../../../config/validator.usuario"




export class RegisterUsuarioDto {

      private constructor(

            public nombre: string,
            public apellido: string,
            public documento: string,
            public numeroDocumento: number,
            public email: string,
            public nombreUsuario: string,
            public password: string,
            public cargo: number,
            public estado?: boolean
      ) { }

      static create(object: { [key: string]: any }): [string?, RegisterUsuarioDto?] {

            const { Nombre, Apellido, Documento, NumeroDocumento, Email, NombreUsuario, Password, idCargo, Estado } = object

            if (!Nombre) return ['Missing nombre']
            if (!Apellido) return ['Missing Apellido']
            if (!Documento) return ['Missing Documento']
            if (!NumeroDocumento) return ['Missing NuemroDocumento']
            if (!UsuarioValidators.email.test(Email)) return ['Email is not valid']
            if (!NombreUsuario) return ['Missing Nombre de usuario']
            if (!Password) return ['Missing Password']
            if (!idCargo) return ['Missing ID Cargo']
            if (!Estado) return ['Missing Estado']

            return [
                  undefined,
                  new
                        RegisterUsuarioDto
                        (
                              Nombre,
                              Apellido,
                              Documento,
                              NumeroDocumento,
                              Email,
                              NombreUsuario,
                              Password,
                              idCargo,
                              Estado
                        )
            ]
      }
}