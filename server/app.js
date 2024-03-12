const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const {protectedRouter, router} = require("./routes");
require("dotenv").config();

app.use(express.json());

app.use("/api", router);
app.use("/api", protectedRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_DB_URL);
    app.listen(PORT, () => {
      console.log("Listening on port 5000...");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
