import 'dotenv/config';

import path from 'path';
import { DataSource } from 'typeorm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const DB_PORT = process.env.DB_PORT as number | undefined;

const dataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: [`${__dirname}/**/entities/*.{ts, js}`],
	migrations: [`${__dirname}/**/migrations/*.{ts, js}`]
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
