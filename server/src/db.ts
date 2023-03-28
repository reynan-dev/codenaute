import { DataSource, LoggerOptions } from 'typeorm';

export abstract class Database {
	private static readonly DB_PORT = process.env.DB_PORT as number | undefined;
	private static readonly DB_TEST_PORT = process.env.DB_TEST_PORT as number | undefined;

	private static readonly type = 'postgres';
	private static readonly host =
		process.env.NODE_ENV === 'test' ? process.env.DB_TEST_HOST : process.env.DB_HOST;
	private static readonly port = process.env.NODE_ENV === 'test' ? this.DB_TEST_PORT : this.DB_PORT;
	private static readonly username =
		process.env.NODE_ENV === 'test' ? process.env.DB_TEST_USER : process.env.DB_USER;
	private static readonly password =
		process.env.NODE_ENV === 'test' ? process.env.DB_TEST_PASSWORD : process.env.DB_PASSWORD;
	private static readonly database =
		process.env.NODE_ENV === 'test' ? process.env.DB_TEST_DATABASE : process.env.DB_DATABASE;
	private static readonly entities = [
		`${__dirname}/**/models/*.${process.env.NODE_ENV === 'test' ? 'ts' : 'js'}`
	];
	private static readonly migrations = [
		`${__dirname}/**/migrations/*.${process.env.NODE_ENV === 'test' ? 'ts' : 'js'}`
	];
	private static readonly logging: LoggerOptions | undefined =
		process.env.NODE_ENV === 'test' ? ['error'] : ['query', 'error'];
	private static readonly synchronize: boolean = true;

	private static _dataSource: DataSource = new DataSource({
		type: this.type,
		host: this.host,
		port: this.port,
		username: this.username,
		password: this.password,
		database: this.database,
		entities: this.entities,
		migrations: this.migrations,
		logging: this.logging,
		synchronize: this.synchronize
	});

	static entityMetadatas() {
		return this._dataSource.entityMetadatas;
	}

	private static async initialize() {
		return await this._dataSource.initialize();
	}

	private static async destroy() {
		return await this._dataSource.destroy();
	}

	static async start() {
		try {
			await this.initialize();
			console.info('🎉 Successfully connected to database');
		} catch (error) {
			console.log('😞 Database connection error');
			console.log(error);
		}
	}

	static async stop() {
		try {
			await this.destroy();
			console.info('💀 Successfully disconnected to database');
		} catch (error) {
			console.log('😞 Database disconnection error');
			console.log(error);
		}
	}

	static repository(entity: string) {
		return this._dataSource.getRepository(entity);
	}
}
