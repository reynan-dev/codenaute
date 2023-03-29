import { DataSource, LoggerOptions, ObjectLiteral, Repository } from 'typeorm';

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
	private static readonly models = [
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
		entities: this.models,
		migrations: this.migrations,
		logging: this.logging,
		synchronize: this.synchronize
	});

	static entities() {
		return this._dataSource.entityMetadatas;
	}

	private static async _initialize(): Promise<DataSource> {
		return await this._dataSource.initialize();
	}

	private static async _destroy(): Promise<void> {
		return await this._dataSource.destroy();
	}

	static async start(): Promise<DataSource | void> {
		try {
			await this._initialize();
			console.info('🎉 Successfully connected to database');
		} catch (error) {
			console.info('😞 Database connection error');
			console.error(error);
		}
	}

	static async stop(): Promise<DataSource | void> {
		try {
			await this._destroy();
			console.info('💀 Successfully disconnected to database');
		} catch (error) {
			console.info('😞 Database disconnection error');
			console.error(error);
		}
	}

	static repository(entity: string): Repository<ObjectLiteral> {
		return this._dataSource.getRepository(entity);
	}
}
