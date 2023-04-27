require('dotenv').config();

module.exports = [
	{
		type: 'postgres',
		host: 'database-dev',
		port: 5432,
		username: '78das1278q9',
		password: 'bxfsFrWMBgc4MqBud6s',
		database: 'codenaute-dev',
		entities: ['src/models/*.ts', 'dist/models/*.js'],
		migrations: ['src/migrations/*.ts'],
		seeds: ['src/seeds/*.seeds.ts'],
		factories: ['src/seeds/*.factory.ts']
	}
];
