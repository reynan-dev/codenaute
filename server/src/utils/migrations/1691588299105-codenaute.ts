import { MigrationInterface, QueryRunner } from 'typeorm';

export class codenaute1691588299105 implements MigrationInterface {
	name = 'codenaute1691588299105';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "public"."project_sandpacktemplate_enum" AS ENUM('static', 'angular', 'react', 'react-ts', 'solid', 'svelte', 'test-ts', 'vanilla-ts', 'vanilla', 'vue', 'vue-ts', 'node', 'nextjs', 'vite', 'vite-react', 'vite-react-ts', 'vite-vue', 'vite-vue-ts', 'vite-svelte', 'vite-svelte-ts', 'astro')`
		);
		await queryRunner.query(
			`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "sandpackTemplate" "public"."project_sandpacktemplate_enum" NOT NULL, "files" character varying, "environment" character varying NOT NULL, "mainFile" character varying NOT NULL, "isPublic" boolean NOT NULL DEFAULT false, "deletedAt" TIMESTAMP, "ownerId" uuid, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "session" ("token" character varying(32) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "memberId" uuid, CONSTRAINT "PK_232f8e85d7633bd6ddfad421696" PRIMARY KEY ("token"))`
		);
		await queryRunner.query(
			`CREATE TABLE "member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "hashedPassword" character varying NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_4678079964ab375b2b31849456" ON "member" ("email") `
		);
		await queryRunner.query(
			`ALTER TABLE "project" ADD CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed" FOREIGN KEY ("ownerId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "session" ADD CONSTRAINT "FK_1f8d57f74fb4486a743d89d4820" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "session" DROP CONSTRAINT "FK_1f8d57f74fb4486a743d89d4820"`
		);
		await queryRunner.query(
			`ALTER TABLE "project" DROP CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed"`
		);
		await queryRunner.query(`DROP INDEX "public"."IDX_4678079964ab375b2b31849456"`);
		await queryRunner.query(`DROP TABLE "member"`);
		await queryRunner.query(`DROP TABLE "session"`);
		await queryRunner.query(`DROP TABLE "project"`);
		await queryRunner.query(`DROP TYPE "public"."project_sandpacktemplate_enum"`);
	}
}
