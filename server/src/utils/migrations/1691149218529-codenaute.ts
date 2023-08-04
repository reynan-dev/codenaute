import { MigrationInterface, QueryRunner } from 'typeorm';

export class codenaute1691149218529 implements MigrationInterface {
	name = 'codenaute1691149218529';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "project" RENAME COLUMN "main" TO "mainFile"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "project" RENAME COLUMN "mainFile" TO "main"`);
	}
}
