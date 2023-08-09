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
				return process.env.DB_TEST_HOST;
			case Environment.IS_PRODUCTION:
				return process.env.DB_PROD_HOST;
			case Environment.IS_DEVELOPMENT:
				return process.env.DB_DEV_HOST;
		}
	}

	private static _DB_NAME(): string | undefined {
		switch (process.env.NODE_ENV) {
			case Environment.IS_TEST:
				return process.env.DB_TEST_DATABASE;
			case Environment.IS_PRODUCTION:
				return process.env.DB_PROD_DATABASE;
			case Environment.IS_DEVELOPMENT:
				return process.env.DB_DEV_DATABASE;
		}
	}

	private static _DB_USER(): string | undefined {
		switch (process.env.NODE_ENV) {
			case Environment.IS_TEST:
				return process.env.DB_TEST_USER;
			case Environment.IS_PRODUCTION:
				return process.env.DB_PROD_USER;
			case Environment.IS_DEVELOPMENT:
				return process.env.DB_DEV_USER;
		}
	}

	private static _DB_PASSWORD(): string | undefined {
		switch (process.env.NODE_ENV) {
			case Environment.IS_TEST:
				return process.env.DB_TEST_PASSWORD;
			case Environment.IS_PRODUCTION:
				return process.env.DB_PROD_PASSWORD;
			case Environment.IS_DEVELOPMENT:
				return process.env.DB_DEV_PASSWORD;
		}
	}

	private static readonly type = 'postgres';

	private static readonly url =
		process.env.DATABASE_URL ||
		`${
			this.type
		}://${this._DB_USER()}:${this._DB_PASSWORD()}@${this._DB_HOST()}:${this._DB_PORT()}/${this._DB_NAME()}`;

	private static readonly models = [
		`${__dirname}/../../**/models/*.${process.env.NODE_ENV === Environment.IS_TEST ? 'ts' : 'js'}`
	];
	private static readonly migrations = [`${__dirname}/../**/migrations/*.ts`];
	private static readonly migrationsRun =
		process.env.NODE_ENV === Environment.IS_DEVELOPMENT ? false : true;
	private static readonly logging: LoggerOptions | undefined =
		process.env.NODE_ENV === Environment.IS_PRODUCTION ? ['error'] : ['query', 'error'];
	private static readonly synchronize: boolean = false;

	private static _dataSource: DataSource = new DataSource({
		type: this.type,
		url: this.url,
		entities: this.models,
		migrations: this.migrations,
		migrationsRun: this.migrationsRun,
		logging: this.logging,
		synchronize: this.synchronize
	});

	static entities() {
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
			if (process.env.NODE_ENV != Environment.IS_PRODUCTION)
				console.info('🎉 Successfully connected to database');
		} catch (error) {
			console.error('😞 Database connection error');
			console.error(error);
		}
	}

	static async stop() {
		try {
			await this.destroy();
			if (process.env.NODE_ENV != Environment.IS_PRODUCTION)
				console.info('💀 Successfully disconnected to database');
		} catch (error) {
			console.error('😞 Database disconnection error');
			console.error(error);
		}
	}

	static repository(entity: string) {
		return this._dataSource.getRepository(entity);
	}

	static async seed(seeds: (dataSource: DataSource) => Promise<void>) {
		try {
			await this._dataSource.initialize();
			await seeds(this._dataSource);
		} catch (error) {
			console.error(error);
		} finally {
			await this._dataSource.destroy();
		}
	}

	static async dataSource() {
		return this._dataSource;
	}
}

export default Database.dataSource();
