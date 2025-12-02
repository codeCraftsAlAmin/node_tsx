import express, { Request, Response } from "express";
import { pool } from "../db";
import { userController } from "./users/users.controller";

const router = express.Router();

// create user
router.post("/", userController.createUsers);

// get all users
router.get("/", userController.getUsers);

// get single user
router.get("/:id", userController.getSingleUSer);

// update user
router.put("/:id", userController.updateUser);

// delete user
router.delete("/:id", userController.deleteUser);

export const userRouter = router;
