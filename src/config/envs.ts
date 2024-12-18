import 'dotenv/config'
import env from 'env-var'


export const envs ={

      PORT:env.get('PORT').required().asPortNumber(),
      DATABASE_URL:env.get('DATABASE_URL').required().asString(),
      JWT_SEED:env.get('JWT_SEED').required().asString()

}