import { DataSource, LoggerOptions } from 'typeorm';
import { Environment } from 'utils/enums/Environment';

export abstract class Database {

	private static _DB_PORT(): number | undefined {
		switch (process.env.NODE_ENV) {
			case Environment.IS_TEST:
				return process.env.DB_TEST_PORT as number | undefined;
			case Environment.IS_PRODUCTION:
				return process.env.DB_PROD_PORT as number | undefined;
			case Environment.IS_DEVELOPMENT:
				return process.env.DB_DEV_PORT as number | undefined;
		}
	}

	private static _DB_HOST(): string | undefined {
		switch (process.env.NODE_ENV) {
			case Environment.IS_TEST:
				return process.env.DB_TEST_HOST as string | undefined;
			case Environment.IS_PRODUCTION:
				return process.env.DB_PROD_HOST as string | undefined;
			case Environment.IS_DEVELOPMENT:
				return process.env.DB_DEV_HOST as string | undefined;
		}
	}

	private static _DB_NAME(): string | undefined {
		switch (process.env.NODE_ENV) {
			case Environment.IS_TEST:
				return process.env.DB_TEST_DATABASE as string | undefined;
			case Environment.IS_PRODUCTION:
				return process.env.DB_PROD_DATABASE as string | undefined;
			case Environment.IS_DEVELOPMENT:
				return process.env.DB_DEV_DATABASE as string | undefined;
		}
	}

	private static _DB_USER(): string | undefined {
		switch (process.env.NODE_ENV) {
			case Environment.IS_TEST:
				return process.env.DB_TEST_USER as string | undefined;
			case Environment.IS_PRODUCTION:
				return process.env.DB_PROD_USER as string | undefined;
			case Environment.IS_DEVELOPMENT:
				return process.env.DB_DEV_USER as string | undefined;
		}
	}

	private static _DB_PASSWORD(): string | undefined {
		switch (process.env.NODE_ENV) {
			case Environment.IS_TEST:
				return process.env.DB_TEST_PASSWORD as string | undefined;
			case Environment.IS_PRODUCTION:
				return process.env.DB_PROD_PASSWORD as string | undefined;
			case Environment.IS_DEVELOPMENT:
				return process.env.DB_DEV_PASSWORD as string | undefined;
		}
	}

	private static readonly type = 'postgres';
	private static readonly host = this._DB_HOST();
	private static readonly port = this._DB_PORT();
	private static readonly username = this._DB_USER();
	private static readonly password = this._DB_PASSWORD();
	private static readonly database = this._DB_NAME();
	private static readonly entities = [
		`${__dirname}/**/models/*.${process.env.NODE_ENV === Environment.IS_TEST ? 'ts' : 'js'}`
	];
	private static readonly migrations = [
		`${__dirname}/**/migrations/*.${process.env.NODE_ENV === Environment.IS_TEST ? 'ts' : 'js'}`
	];
	private static readonly logging: LoggerOptions | undefined =
		process.env.NODE_ENV === Environment.IS_PRODUCTION ? ['error'] : ['query', 'error'];
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
			if (process.env.NODE_ENV != Environment.IS_PRODUCTION) console.info('🎉 Successfully connected to database');
		} catch (error) {
			console.log('😞 Database connection error');
			console.log(error);
		}
	}

	static async stop() {
		try {
			await this.destroy();
			if (process.env.NODE_ENV != Environment.IS_PRODUCTION) console.info('💀 Successfully disconnected to database');
		} catch (error) {
			console.log('😞 Database disconnection error');
			console.log(error);
		}
	}

	static repository(entity: string) {
		return this._dataSource.getRepository(entity);
	}
}
