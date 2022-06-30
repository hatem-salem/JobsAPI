require('dotenv').config();
require('express-async-errors');
//extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimitter = require('express-rate-limit');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const port = process.env.PORT || 3000;


const notFoundMiddleware = require('./middleware/404');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticateUser = require('./middleware/authentication');

const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimitter({
    windowMs: 60 * 1000,
    max: 60
}));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}


start();