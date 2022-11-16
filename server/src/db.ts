import 'dotenv/config';

import path from 'path';
import { DataSource } from 'typeorm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const DB_PORT = process.env.DB_PORT as number | undefined;

const dataSource = new DataSource({
  type: 'postgres',
  url: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  entities: [`${__dirname}/**/entities/*.{ts, js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts, js}`],
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
