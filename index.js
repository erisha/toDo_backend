import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
// import passport from 'passport';
import session from 'express-session';

//import routes
import usersRouter from '../toDo_backend/routes/userRoutes'
import todoRouter from '../toDo_backend/routes/todoRoutes'

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(morgan('dev'));//logger shows request being called
app.use(cors());// connect to frontend
app.use(express.json())// date in req.body
app.use(express.urlencoded({ extended: true })); // allow data in url
app.use(bodyParser.json());


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

app.use('api/users', usersRouter)
app.use('api/todo', todoRouter)
mongoose.connect('mongodb://127.0.0.1:27017/Todo');

//routes

//randomActivity








app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})