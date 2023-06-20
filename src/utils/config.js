import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/testdb'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

const JWT_KEY = process.env.SECRET || 'Q?=R=%%YC?oOU://Tim&&7HIP33*n'

const SESSION_SECRET = process.env.SESSION_SECRET || 'WAqer16//&&***aggiP'

const config = {
  port: PORT,
  base_url: BASE_URL,
  mongo_url: MONGO_URL,
  secret: JWT_KEY,
  session_secret: SESSION_SECRET,
}

export default config
