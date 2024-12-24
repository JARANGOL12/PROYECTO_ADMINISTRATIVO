import { emit } from "process"
import { CustomError, UsuarioEntity } from "../../domian"






export class UsuarioMapper {

      static usuarioEntityFromObject(object: { [key: string]: any }) {

            const {idUsuario, Nombre, Apellido, Documento, NumeroDocumento, Email, NombreUsuario, Password, idCargo, Estado } = object

            if (!idUsuario) {
                  throw CustomError.badRequest('Missing idUsuario not')

            }
            if (!Nombre) throw CustomError.badRequest('Missing nombre .....')
            if (!Apellido) throw CustomError.badRequest('Missing Apellido')
            if (!Documento) throw CustomError.badRequest('Missing Document')
            if (!NumeroDocumento) throw CustomError.badRequest('Missing Number and Documnet')
            if (!Email) throw CustomError.badRequest('Missing Email')
            if (!NombreUsuario) throw CustomError.badRequest('Missing NombreUsuario')
            if (!Password) throw CustomError.badRequest('Missing Password')
            if (!idCargo) throw CustomError.badRequest('Missing IdCargo ....---')
            if (!Estado) throw CustomError.badRequest('Missing Estado')


            return new UsuarioEntity(
                  idUsuario,
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
      }
}