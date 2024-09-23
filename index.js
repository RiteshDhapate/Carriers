import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import route from "./routes/route.js";

dotenv.config();



const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", route);
app.get("/", (req, res) => {
  res.send("server is healthy");
});



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`SERVER: listening on port ${PORT}`);
});