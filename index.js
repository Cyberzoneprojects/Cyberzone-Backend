const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();
const app = express()

app.use(cors({origin: true}))
app.use(express.json())

app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', routes())
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use(routes())
// Handles 5xx errors
app.use((err, req, res, next)=>{
    res.status(500).json({err: err.message})
})


app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
