import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
dotenv.config();

import Common from "./models/Common.js";

const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["src/entity/**/*.js"],
  migrations: ["src/migration/**/*.js"],
  logging: true,
});

const connectDB = async function () {
  try {
    await dataSource.initialize();
    console.log("Successfully connected to database");
  } catch (error) {
    console.log("Database connection error");
    console.log(error);
  }
};

export { DataSource, connectDB };
