import "dotenv/config";
import express from "express";
import path from "path";
import colors from "colors";
import userRouter from "./routes/userRoutes.js";
import ticketRouter from "./routes/ticketRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";

// connect to database

connectDB();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", userRouter);
app.use("/api/tickets", ticketRouter);
app.use(errorHandler);

// respond with "hello world" when a GET request is made to the homepage

app.listen(PORT, () => {
  return console.log(`Server listening on port ${PORT}`);
});

// Serve front end

if (process.env.NODE_ENV === "production") {
  // set build folder as static
  app.use(express.static(__dirname, "../frontend/build"));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Support Desk App" });
  });
}
