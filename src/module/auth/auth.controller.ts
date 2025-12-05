import express, { Request, Response } from "express";
import { authService } from "./auth.service";

const userLogin = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUser(req.body);

    res.status(200).send({
      success: true,
      message: "User successfully logged in",
      result: result,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const userController = {
  userLogin,
};
