import { MigrationInterface, QueryRunner } from 'typeorm';

export class codenaute1691581386772 implements MigrationInterface {
	name = 'codenaute1691581386772';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "public"."project_sandpacktemplate_enum" AS ENUM('static', 'angular', 'react', 'react-ts', 'solid', 'svelte', 'test-ts', 'vanilla-ts', 'vanilla', 'vue', 'vue-ts', 'node', 'nextjs', 'vite', 'vite-react', 'vite-react-ts', 'vite-vue', 'vite-vue-ts', 'vite-svelte', 'vite-svelte-ts', 'astro')`
		);
		await queryRunner.query(
			`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "sandpackTemplate" "public"."project_sandpacktemplate_enum" NOT NULL, "files" character varying, "environment" character varying NOT NULL, "mainFile" character varying NOT NULL, "isTemplate" boolean NOT NULL DEFAULT false, "isPublic" boolean NOT NULL DEFAULT false, "deletedAt" TIMESTAMP, "ownerId" uuid, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "session" ("token" character varying(32) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "memberId" uuid, CONSTRAINT "PK_232f8e85d7633bd6ddfad421696" PRIMARY KEY ("token"))`
		);
		await queryRunner.query(
			`CREATE TABLE "member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "isValidEmail" boolean NOT NULL DEFAULT false, "hashedPassword" character varying NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "IDX_4678079964ab375b2b31849456" ON "member" ("email") `
		);
		await queryRunner.query(
			`CREATE TABLE "routing_token" ("token" character varying(32) NOT NULL, "email" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_de7ac735206abe56f207b988e3a" PRIMARY KEY ("token"))`
		);
		await queryRunner.query(
			`CREATE TABLE "member_projects_invited_on_project" ("memberId" uuid NOT NULL, "projectId" uuid NOT NULL, CONSTRAINT "PK_b685206cfa5b70883478168b07d" PRIMARY KEY ("memberId", "projectId"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_de0a185b3c8734f1ec6a015368" ON "member_projects_invited_on_project" ("memberId") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_428f6945113b77207205d517ce" ON "member_projects_invited_on_project" ("projectId") `
		);
		await queryRunner.query(
			`CREATE TABLE "member_favorited_projects_project" ("memberId" uuid NOT NULL, "projectId" uuid NOT NULL, CONSTRAINT "PK_72fa07aba0096975f79b291e1a2" PRIMARY KEY ("memberId", "projectId"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_7af230a3b70e6c00513003b784" ON "member_favorited_projects_project" ("memberId") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_7b3af91330135f42e617a43dc2" ON "member_favorited_projects_project" ("projectId") `
		);
		await queryRunner.query(
			`CREATE TABLE "member_followers_member" ("memberId_1" uuid NOT NULL, "memberId_2" uuid NOT NULL, CONSTRAINT "PK_c3e999fc3f32287eb2a2e3bdda2" PRIMARY KEY ("memberId_1", "memberId_2"))`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_a8a5bebdd4adf22bde46465356" ON "member_followers_member" ("memberId_1") `
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_0b45d073782c9d0560f2d94a98" ON "member_followers_member" ("memberId_2") `
		);
		await queryRunner.query(
			`ALTER TABLE "project" ADD CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed" FOREIGN KEY ("ownerId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "session" ADD CONSTRAINT "FK_1f8d57f74fb4486a743d89d4820" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "member_projects_invited_on_project" ADD CONSTRAINT "FK_de0a185b3c8734f1ec6a0153687" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "member_projects_invited_on_project" ADD CONSTRAINT "FK_428f6945113b77207205d517ce7" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "member_favorited_projects_project" ADD CONSTRAINT "FK_7af230a3b70e6c00513003b784e" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "member_favorited_projects_project" ADD CONSTRAINT "FK_7b3af91330135f42e617a43dc24" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "member_followers_member" ADD CONSTRAINT "FK_a8a5bebdd4adf22bde464653567" FOREIGN KEY ("memberId_1") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE CASCADE`
		);
		await queryRunner.query(
			`ALTER TABLE "member_followers_member" ADD CONSTRAINT "FK_0b45d073782c9d0560f2d94a986" FOREIGN KEY ("memberId_2") REFERENCES "member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "member_followers_member" DROP CONSTRAINT "FK_0b45d073782c9d0560f2d94a986"`
		);
		await queryRunner.query(
			`ALTER TABLE "member_followers_member" DROP CONSTRAINT "FK_a8a5bebdd4adf22bde464653567"`
		);
		await queryRunner.query(
			`ALTER TABLE "member_favorited_projects_project" DROP CONSTRAINT "FK_7b3af91330135f42e617a43dc24"`
		);
		await queryRunner.query(
			`ALTER TABLE "member_favorited_projects_project" DROP CONSTRAINT "FK_7af230a3b70e6c00513003b784e"`
		);
		await queryRunner.query(
			`ALTER TABLE "member_projects_invited_on_project" DROP CONSTRAINT "FK_428f6945113b77207205d517ce7"`
		);
		await queryRunner.query(
			`ALTER TABLE "member_projects_invited_on_project" DROP CONSTRAINT "FK_de0a185b3c8734f1ec6a0153687"`
		);
		await queryRunner.query(
			`ALTER TABLE "session" DROP CONSTRAINT "FK_1f8d57f74fb4486a743d89d4820"`
		);
		await queryRunner.query(
			`ALTER TABLE "project" DROP CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed"`
		);
		await queryRunner.query(`DROP INDEX "public"."IDX_0b45d073782c9d0560f2d94a98"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_a8a5bebdd4adf22bde46465356"`);
		await queryRunner.query(`DROP TABLE "member_followers_member"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_7b3af91330135f42e617a43dc2"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_7af230a3b70e6c00513003b784"`);
		await queryRunner.query(`DROP TABLE "member_favorited_projects_project"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_428f6945113b77207205d517ce"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_de0a185b3c8734f1ec6a015368"`);
		await queryRunner.query(`DROP TABLE "member_projects_invited_on_project"`);
		await queryRunner.query(`DROP TABLE "routing_token"`);
		await queryRunner.query(`DROP INDEX "public"."IDX_4678079964ab375b2b31849456"`);
		await queryRunner.query(`DROP TABLE "member"`);
		await queryRunner.query(`DROP TABLE "session"`);
		await queryRunner.query(`DROP TABLE "project"`);
		await queryRunner.query(`DROP TYPE "public"."project_sandpacktemplate_enum"`);
	}
}
