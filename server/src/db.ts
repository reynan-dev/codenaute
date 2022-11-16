import 'dotenv/config';

import { DataSource } from 'typeorm';

const DB_PORT = process.env.DB_PORT as number | undefined;

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  logging: true,
});

const connectDB = async function () {
  try {
    await dataSource.initialize();
    console.log('🎉 Successfully connected to database');
  } catch (error) {
    console.log('😞 Database connection error');
    console.log(error);
  }
};

export { dataSource, connectDB };
