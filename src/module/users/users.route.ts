import express, { Request, Response } from "express";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// create user
router.post("/", userController.createUsers);

// get all users
router.get("/", auth("admin"), userController.getUsers);

// get single user
router.get("/:id", auth("admin", "user"), userController.getSingleUSer);

// update user
router.put("/:id", userController.updateUser);

// delete user
router.delete("/:id", userController.deleteUser);

export const userRouter = router;
