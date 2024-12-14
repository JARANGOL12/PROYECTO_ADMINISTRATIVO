import { PrismaClient } from "@prisma/client"


interface Options{
      
      DATABASE_URL:string
}


export class MysqlDatabase{


      static prisma:PrismaClient

      static async connect(options:Options){
            const {DATABASE_URL}=options
            try {
                  this.prisma= new PrismaClient()
                  await this.prisma.$connect

                  console.log('Mysql Connet exito')
                  return true
            } catch (error) {
                  console.log('Mysql connection error:', error)
                  throw error
                  
            }
      }

}