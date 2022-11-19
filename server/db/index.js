// doesn't work but saw it here:
//https://www.youtube.com/watch?v=2tXEbngL74s&list=PLaAoUJDWH9WpmAUayPDh8zrwZoH_PZ4ON&index=12
//https://www.youtube.com/watch?v=H4IBeGwPIgs&list=PLaAoUJDWH9WpmAUayPDh8zrwZoH_PZ4ON&index=13
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/bookMarked", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db is connected"))
  .catch((err) => console.log("error"));
