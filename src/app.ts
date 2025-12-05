import express, { Request, Response } from "express";

import initDb, { pool } from "./db";
import { todoRouter } from "./module/todos/todos.route";
import { userRouter } from "./module/users/users.route";
import { authRouter } from "./module/auth/auth.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// initializing DB
initDb();

// * auth route
app.use("/auth", authRouter);

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

export default app;
