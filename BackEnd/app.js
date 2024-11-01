const express = require('express');
const app = express();
const movieRoutes = require('./routes/movie');
const cors = require('cors');


app.use(cors());
// app.use('/', (req, res, next) => {
//     res.send("<h1>bắt đầu!</h1>");
// })
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use('/api/movies', movieRoutes);

app.use((req, res, next) => {
   res.status(404).json({
      message: "Route not found",
   })
})

PORT = 5000;
app.listen(PORT, () => {
   console.log("Server started on port 5000");
})