import { pool } from "../../db";

const createTodo = async (payload: Record<string, unknown>) => {
  const { user_id, title } = payload;
  
  const result = await pool.query(
    `INSERT INTO todos(user_id, title) VALUES($1, $2)  RETURNING *`,
    [user_id, title]
  );

  return result;
};

const getTodos = async () => {
  const result = await pool.query(`SELECT * from todos`);
  return result;
};

const getSingleTodo = async (id: string) => {
  const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [id]);

  return result;
};

const updateTodo = async (title: string, id: string) => {
  const result = await pool.query(
    `UPDATE todos SET title=$1 WHERE id=$2 RETURNING *`,
    [title, id]
  );

  return result;
};

const deleteTodo = async (id: string) => {
  await pool.query(`DELETE FROM todos WHERE id=$1`, [id]);
};

export const todosService = {
  createTodo,
  getTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
