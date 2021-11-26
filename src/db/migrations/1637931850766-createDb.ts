import {MigrationInterface, QueryRunner} from "typeorm";

export class createDb1637931850766 implements MigrationInterface {
    name = 'createDb1637931850766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "movieId" integer)`);
        await queryRunner.query(`CREATE TABLE "movies" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "about" varchar NOT NULL, "release_date" datetime NOT NULL, "maximum_date" datetime NOT NULL, "blocked" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cinemaId" integer)`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cinemaId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "cinemas" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "address" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "movieId" integer, CONSTRAINT "FK_152b29050d65f7b6c3888d9d6ec" FOREIGN KEY ("movieId") REFERENCES "movies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_images"("id", "path", "movieId") SELECT "id", "path", "movieId" FROM "images"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`ALTER TABLE "temporary_images" RENAME TO "images"`);
        await queryRunner.query(`CREATE TABLE "temporary_movies" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "about" varchar NOT NULL, "release_date" datetime NOT NULL, "maximum_date" datetime NOT NULL, "blocked" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cinemaId" integer, CONSTRAINT "FK_ec02b414813e3b5e8622a03a6e6" FOREIGN KEY ("cinemaId") REFERENCES "cinemas" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_movies"("id", "name", "about", "release_date", "maximum_date", "blocked", "created_at", "updated_at", "cinemaId") SELECT "id", "name", "about", "release_date", "maximum_date", "blocked", "created_at", "updated_at", "cinemaId" FROM "movies"`);
        await queryRunner.query(`DROP TABLE "movies"`);
        await queryRunner.query(`ALTER TABLE "temporary_movies" RENAME TO "movies"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cinemaId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "FK_32dc5368285e0b69f2f72326b60" FOREIGN KEY ("cinemaId") REFERENCES "cinemas" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "email", "password", "role", "created_at", "updated_at", "cinemaId") SELECT "id", "name", "email", "password", "role", "created_at", "updated_at", "cinemaId" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cinemaId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "email", "password", "role", "created_at", "updated_at", "cinemaId") SELECT "id", "name", "email", "password", "role", "created_at", "updated_at", "cinemaId" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "movies" RENAME TO "temporary_movies"`);
        await queryRunner.query(`CREATE TABLE "movies" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "about" varchar NOT NULL, "release_date" datetime NOT NULL, "maximum_date" datetime NOT NULL, "blocked" boolean NOT NULL DEFAULT (1), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cinemaId" integer)`);
        await queryRunner.query(`INSERT INTO "movies"("id", "name", "about", "release_date", "maximum_date", "blocked", "created_at", "updated_at", "cinemaId") SELECT "id", "name", "about", "release_date", "maximum_date", "blocked", "created_at", "updated_at", "cinemaId" FROM "temporary_movies"`);
        await queryRunner.query(`DROP TABLE "temporary_movies"`);
        await queryRunner.query(`ALTER TABLE "images" RENAME TO "temporary_images"`);
        await queryRunner.query(`CREATE TABLE "images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "movieId" integer)`);
        await queryRunner.query(`INSERT INTO "images"("id", "path", "movieId") SELECT "id", "path", "movieId" FROM "temporary_images"`);
        await queryRunner.query(`DROP TABLE "temporary_images"`);
        await queryRunner.query(`DROP TABLE "cinemas"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "movies"`);
        await queryRunner.query(`DROP TABLE "images"`);
    }

}
