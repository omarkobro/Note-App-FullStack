import express from 'express'
import cors from 'cors'
import db_connection from './DB/dbConnection.js'
import userRouter from './src/modules/users/users.router.js'
import noteRouter from './src/modules/notes/notes.router.js'
import { config } from 'dotenv'
import  globalResponse  from './src/middlewares/globalResponse.js'

config({ path: './.env' })

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

db_connection()

// const allowedOrigins = [
//   'http://localhost:5173',
//   process.env.CLIENT_URL
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// }));
app.use(cors()); //Testing
app.get('/', (req,res)=>{
  res.json("hello world")
  
})
app.use('/user', userRouter)
app.use('/note', noteRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
})

app.use(globalResponse)
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
