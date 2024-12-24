import { error } from "console";
import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt";
import { UsuarioModel } from "../../data/mysql/models/usuario.model";



export class UsuarioMiddleware {

      static async validateJWT(req: Request, res: Response, next: NextFunction): Promise<void> {

            try {
                  const authorization = req.header('Authorization')

                  if (!authorization) {
                        res.status(400).json({ error: 'no token Provided' })
                        return
                  }
                  // verifica que el encabezado tenga el profijo 
                  if (!authorization.startsWith('Bearer')) {
                        res.status(401).json({ error: 'Invalid Bearer token' })
                        return
                  }
                  // Extrae el token del encabezado
                  const token = authorization.split(' ')[1] || ''
                  

                  // Valida el tooken y obtiene el payload
                  const payload = await JwtAdapter.validateToken<{ id: number }>(token)
                  console.log('Payload:', payload);

                  if (!payload  || !payload.id) {
                        res.status(401).json({ error: 'Invalid token' })
                        return
                  }
                   // Busca el usuario en la base de datos
                  const usuario = await UsuarioModel.findUnique({
                        where: {
                              idUsuario:payload.id

                        }
                  })
                  if (!usuario) {
                        res.status(400).json({ error: 'User not fount' })
                        return
                  }



                  (req as any).usuario=usuario
                  next()

            } catch (error) {
                  console.error(error)
                  res.status(500).json({ error: 'Internal server error ' })

            }
      }
}