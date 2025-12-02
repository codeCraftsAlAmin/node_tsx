import express, { Request, Response } from "express";
import { pool } from "../../db";
import { todosController } from "./todos.controller";

const router = express.Router();

// create todos
router.post("/", todosController.createTodo);

// get all todos
router.get("/", todosController.getTodos);

// get single todo
router.get("/:id", todosController.getSingleTodo);

// update todo
router.put("/:id", todosController.updateTodo);

// delete todo
router.delete("/:id", todosController.deleteTodo);

export const todoRouter = router;
