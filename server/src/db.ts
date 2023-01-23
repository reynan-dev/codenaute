import { DataSource } from 'typeorm';

const DB_PORT = process.env.DB_PORT as number | undefined;
const DB_TEST_PORT = process.env.DB_TEST_PORT as number | undefined;

const dataSource = new DataSource({
	type: 'postgres',
	host: process.env.NODE_ENV === 'test' ? process.env.DB_TEST_HOST : process.env.DB_HOST,
	port: process.env.NODE_ENV === 'test' ? DB_TEST_PORT : DB_PORT,
	username: process.env.NODE_ENV === 'test' ? process.env.DB_TEST_USER : process.env.DB_USER,
	password:
		process.env.NODE_ENV === 'test' ? process.env.DB_TEST_PASSWORD : process.env.DB_PASSWORD,
	database:
		process.env.NODE_ENV === 'test' ? process.env.DB_TEST_DATABASE : process.env.DB_DATABASE,
	entities: [`${__dirname}/**/entities/*.${process.env.NODE_ENV === 'test' ? 'ts' : 'js'}`],
	migrations: [`${__dirname}/**/migrations/*.${process.env.NODE_ENV === 'test' ? 'ts' : 'js'}`],
	logging: process.env.NODE_ENV === 'test' ? ['error'] : ['query', 'error'],
	synchronize: true
});

const startDatabase = async function () {
	try {
		await dataSource.initialize();
		console.log('🎉 Successfully connected to database');
	} catch (error) {
		console.log('😞 Database connection error');
		console.log(error);
	}
};

const closeDatabase = async function () {
	try {
		await dataSource.destroy();
		console.log('💀 Successfully closed database connection');
	} catch (error) {
		console.log('😞 Database disconnection error');
		console.log(error);
	}
};

export { dataSource, startDatabase, closeDatabase };
