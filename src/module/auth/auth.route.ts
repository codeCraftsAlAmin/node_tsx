import express, { Request, Response } from "express";
import { userController } from "./auth.controller";

const router = express.Router();

router.post("/login", userController.userLogin);

export const authRouter = router;
