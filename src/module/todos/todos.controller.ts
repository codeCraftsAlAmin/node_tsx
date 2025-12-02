import { Request, Response } from "express";
import { pool } from "../../db";
import { todosService } from "./todos.service";

const createTodo = async (req: Request, res: Response) => {
  try {
    const { user_id, title } = req.body;
    const result = await todosService.createTodo(user_id, title);

    res.status(201).send({
      success: true,
      message: "todos has been created",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(501).send({
      success: false,
      message: err.message,
    });
  }
};

const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await todosService.getTodos();

    res.status(200).send({
      success: false,
      message: "Data retrived successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const getSingleTodo = async (req: Request, res: Response) => {
  try {
    // console.log(req.params.id)
    const result = await todosService.getSingleTodo(req.params.id as string);

    if (result.rows.length <= 0) {
      res.status(500).send({
        success: false,
        message: "Data not found",
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Data retrived successfully",
        data: result.rows[0],
      });
    }

    console.log(result.rows);
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const result = await todosService.updateTodo(
      title,
      req.params.id as string
    );

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(501).send({
      success: false,
      message: err.message,
    });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    await todosService.deleteTodo(req.params.id as string);

    res.status(200).send({
      success: true,
      message: "Data deleted successfully",
      data: null,
    });
  } catch (err: any) {
    res.status(501).send({
      success: false,
      message: err.message,
    });
  }
};

export const todosController = {
  createTodo,
  getTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
