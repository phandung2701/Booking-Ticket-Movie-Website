// import packages
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const logger = require('./helpers/logger');
const connectDabase = require('./config/database');
const errorHandler = require('./helpers/error');

// import router
const movieRouter = require('./routes/movie.route');
const authRouter = require('./routes/auth.route');
const ticketRouter = require('./routes/ticket.router');
const seatRouter = require('./routes/seat.route');
const cinemaRouter = require('./routes/cinema.route');
const provinceRouter = require('./routes/province.route')
const screen = require('./routes/screen.route')
const showTime = require('./routes/showtime.route')
const booking = require('./routes/booking.route')
const movieGenre = require('./routes/movieGenre.route')
const country = require('./routes/country.route')
// process config
const app = express();
dotenv.config();
connectDabase();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/movie', movieRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/ticket', ticketRouter);
app.use('/api/v1/seat', seatRouter);
app.use('/api/v1/cinema', cinemaRouter);
app.use('/api/v1/province', provinceRouter);
app.use('/api/v1/screen', screen);
app.use('/api/v1/showTime', showTime);
app.use('/api/v1/booking', booking);
app.use('/api/v1/movieGenre',movieGenre)
app.use('/api/v1/country',country)


app.use(errorHandler);

// constant variable
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`Server is start on port ${PORT}`);
});

server.on('unhandledRejection', (err, promise) => {
  logger.error(err.message);
  server.close(() => process.exit(1));
});
