import express, { Request, Response } from "express";

import config from "./config";
import initDb, { pool } from "./db";
import { userRouter } from "./module/users.route";
import { todoRouter } from "./module/todos/todos.route";

const app = express();
const port = config.port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initializing DB
initDb();

// * users route
app.use("/users", userRouter);

// * todos route
app.use("/todos", todoRouter);

// * route not found error
app.use((req: Request, res: Response) => {
  res.status(404).send({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

// * localhost runner
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
