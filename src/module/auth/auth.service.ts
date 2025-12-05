import config from "../../config";
import { pool } from "../../db";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

const loginUser = async (payload: Record<string, unknown>) => {
  const { email, password } = payload;

  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];
  //   console.log(result.rows[0]);

  const match = await bcrypt.compare(password as string, user.password);

  if (!match) {
    return false;
  }

  // generate token
  const privateKey = config.jwt_secret;

  var token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    privateKey as string,
    { expiresIn: "7d" }
  );

  // console.log(token);

  return { user, token };
};

export const authService = {
  loginUser,
};
