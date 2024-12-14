import { Server } from "./presentation/server"
import { envs } from "./config"
import { MysqlDatabase } from "./data/mysql/models/mysql.model"
import { AppRouter } from "./presentation/route"

(()=>{
      main()

})()

async function main() {

      await MysqlDatabase.connect({
           DATABASE_URL:envs.DATABASE_URL
      })
      
}
new Server({
      port:envs.PORT,
      routes:AppRouter.route

})
.start() 