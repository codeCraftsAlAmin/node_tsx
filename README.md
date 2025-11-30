🚀 Express.js + TypeScript + PostgreSQL CRUD API

A clean, production-grade boilerplate for building a RESTful CRUD API using Express.js, TypeScript, and PostgreSQL.

This project is designed for scalability, type-safety, and developer-friendly workflow.


🛠️ Technologies Used

Express.js — Web framework

TypeScript — Type-safe development

PostgreSQL — Relational database

Prisma ORM (or pg module) — Database layer

TSX — Zero-config TypeScript runner

Nodemon / Hot reload — Dev server auto-restart


⚙️ Installation & Running the Project

1️⃣ Initialize the project:
```sh
npm init -y
```


📌 Ensure the Project Uses CommonJS (Optional)

If your package.json contains the "type": "module" field, remove it to avoid ESM import/export issues.
```sh
{
  // Remove: "type": "module"
}
```


2️⃣ Install dependencies

Runtime dependencies:
```sh
npm install express --save
```
📚 Official docs: https://expressjs.com



3️⃣ 4. Install TypeScript

Add TypeScript as a development dependency:
```sh
npm install -D typescript
```


4️⃣ Initialize TypeScript
```sh
npx tsc --init
```


5️⃣ Update your tsconfig.json

✅ Uncomment these:
```sh
"rootDir": "./src",
"outDir": "./dist",
```

❗ Comment these to avoid import/export issues:
```sh
// other outputs
// "jsx": "react-jsx",
// "verbatimModuleSyntax": true
```


6️⃣ Install tsx for Modern TypeScript Runtime:
```sh
npm install -D tsx
```
📚 Official docs: https://nodejs.org/en/learn/typescript/run



7️⃣ Add development script (package.json)
```sh
"scripts": {
  "dev": "tsx watch src/server.ts"
}
```


8️⃣ Start development server
```sh
npm run dev
```


🗄️ PostgreSQL Setup

1️⃣ Install PostgreSQL Client

We will use the official pg package to connect Express + TypeScript to PostgreSQL.
```sh
npm install pg
```


2️⃣ Get Your Connection String (Neon DB)

Log in to Neon PostgreSQL, open your database, and copy your connection URI.
```sh
psql 'postgresql://neondb_owner:*******'
```


⚠️ Never commit your connection string to GitHub.
Store it inside .env.

Install dotenv:
```sh
npm i dotenv
```