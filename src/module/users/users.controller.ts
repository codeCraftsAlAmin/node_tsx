import express, { Request, Response } from "express";
import { userService } from "./users.service";

const createUsers = async (req: Request, res: Response) => {
  // console.log(req.body);
  try {
    const result = await userService.createUser(req.body);

    // console.log(result.rows[0]);
    res.status(201).send({
      success: true,
      message: "Data has been created",
      result: result.rows[0],
    });
  } catch (err: any) {
    // console.log(error.message);
    res.status(501).send({
      success: false,
      message: err.message,
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsers();

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

const getSingleUSer = async (req: Request, res: Response) => {
  try {
    // console.log(req.params.id)
    const result = await userService.getSingleUser(req.params.id as string);

    if (result.rows.length <= 0) {
      res.status(500).send({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).send({
        success: false,
        message: "User retrived successfully",
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const result = await userService.updateUser(
      name,
      email,
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(req.params.id as string);

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: null,
    });
  } catch (err: any) {
    res.status(501).send({
      success: false,
      message: err.message,
    });
  }
};

export const userController = {
  createUsers,
  getUsers,
  getSingleUSer,
  updateUser,
  deleteUser,
};
