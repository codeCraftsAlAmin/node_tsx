import { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth = (...role: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      // console.log(token);

      if (!token) {
        return res.status(500).send({
          message: "You are not allowed without token",
        });
      }

      const decoded = jwt.verify(
        token,
        config.jwt_secret as string
      ) as JwtPayload;

      // console.log(decoded);
      req.user = decoded;

      if (role.length && !role.includes(decoded.role as string)) {
        return res.status(500).send({
          error: "Unauthorized!!!",
        });
      }
      next();
    } catch (error: any) {
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  };
};

export default auth;
