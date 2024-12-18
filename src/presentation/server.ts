import exp from "constants"
import express, { Router } from "express"
import cors from 'cors'



interface Options {
      port?: number
      routes: Router

}




export class Server {

      private readonly app = express()
      private readonly port: number
      private readonly routes: Router

      constructor(option: Options) {
            const { port = 80, routes } = option

            this.port = port
            this.routes = routes
      }
      async start() {

            this.app.use(cors({
                  origin: 'http://localhost:5173' // Sin el espacio antes de la URL
            }))


            // Middlewares
            this.app.use(express.json())

            //usar las rutas definidas
            this.app.use(this.routes)




            this.app.listen(this.port, () => {
                  console.log(`Server running on port ${this.port}`)
            })
      }
}