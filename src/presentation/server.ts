import exp from "constants"
import express, { Router } from "express"
import cors from 'cors'



interface Options{
      port?:number
      routes:Router

}




export class Server {
      
      private readonly app=express()
      private readonly port:number
      private readonly routes:Router

      constructor(option:Options){
            const {port = 80,routes}=option

            this.port=port
            this.routes=routes
      }
      async start(){
         
            const corsOptions = {
                  origin: "http://localhost:5173/", // Permite solicitudes solo desde el frontend en localhost:5173
                  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
                  allowedHeaders: "Content-Type,Authorization",
                };
            // Configuración de CORS
           this.app.use(cors(corsOptions));
            // Middlewares
            this.app.use(express.json())

            //usar las rutas definidas
            this.app.use(this.routes)




            this.app.listen(this.port, ()=>{
                  console.log(`Server running on port ${this.port}`)
            })
      }
}