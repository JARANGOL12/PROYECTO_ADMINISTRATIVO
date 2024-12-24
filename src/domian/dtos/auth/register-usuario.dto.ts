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
            public idCargo: number,
            public estado?: boolean
      ) { }

      static create(object: { [key: string]: any }): [string?, RegisterUsuarioDto?] {

            const { nombre, apellido, documento, numeroDocumento, email, nombreUsuario, password,  idCargo, estado } = object;
            if (!nombre) return ['Missing nombre.........']
            if (!apellido) return ['Missing Apellido']
            if (!documento) return ['Missing Documento']
            if (!numeroDocumento) return ['Missing NuemroDocumento']
            if (!UsuarioValidators.email.test(email)) return ['Email is not valid']
            if (!nombreUsuario) return ['Missing Nombre de usuario']
            if (!password) return ['Missing Password']
            if (!idCargo) return ['Missing ID Cargo.......']
            if (!estado) return ['Missing Estado']

            return [
                  undefined,
                  new
                        RegisterUsuarioDto
                        (
                              nombre,
                              apellido,
                              documento,
                              numeroDocumento,
                              email,
                              nombreUsuario,
                              password,
                              idCargo,
                              estado
                        )
            ]
      }
}