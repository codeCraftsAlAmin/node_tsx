import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";
import { title } from "process";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to sqldb
const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`,
});

// sql models
const initDb = async () => {
  await pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INTEGER NOT NULL,
    phone VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS todos(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(100) NOT NULL,
      description TEXT,
      complete BOOLEAN DEFAULT false,
      due_date DATE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
    `);
};

initDb();

// * users route
// create user
app.post("/users", async (req: Request, res: Response) => {
  // console.log(req.body);
  const { name, email, age } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users(name, email, age) VALUES($1, $2, $3)  RETURNING *`,
      [name, email, age]
    );

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
});

// get all users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * from users`);
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
});

// get single user
app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    // console.log(req.params.id)
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      req.params.id,
    ]);

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
});

// update user
app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const result = await pool.query(
      `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
      [name, email, req.params.id]
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
});

// delete user
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    await pool.query(`DELETE FROM users WHERE id=$1`, [req.params.id]);

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
});


// * todos router
// create todos
app.post("/todos", async (req: Request, res: Response) => {
  try {
    const { user_id, title } = req.body;
    const result = await pool.query(
      `INSERT INTO todos(user_id, title) VALUES($1, $2)  RETURNING *`,
      [user_id, title]
    );

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
});

// get all users
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * from todos`);
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
});

// get single user
app.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    // console.log(req.params.id)
    const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [
      req.params.id,
    ]);

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
});

// update todo
app.put("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const result = await pool.query(
      `UPDATE todos SET title=$1 WHERE id=$2 RETURNING *`,
      [title, req.params.id]
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
});

// delete todo
app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    await pool.query(`DELETE FROM todos WHERE id=$1`, [req.params.id]);

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
});

// * route not found error
app.use((req: Request, res: Response) => {
  res.status(404).send({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

// * localhost runner
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
