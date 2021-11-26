import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableMovies1637926253983 implements MigrationInterface {
    name = 'createTableMovies1637926253983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cinemaId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "email", "password", "role", "created_at", "updated_at", "cinemaId") SELECT "id", "name", "email", "password", "role", "created_at", "updated_at", "cinemaId" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "movieId" integer)`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "movieId" integer)`);
        await queryRunner.query(`CREATE TABLE "movies" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "release_date" datetime NOT NULL, "maximum_date" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cinemaId" integer, "imagesId" integer, "tagsId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "movieId" integer, CONSTRAINT "FK_152b29050d65f7b6c3888d9d6ec" FOREIGN KEY ("movieId") REFERENCES "movies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_images"("id", "path", "movieId") SELECT "id", "path", "movieId" FROM "images"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`ALTER TABLE "temporary_images" RENAME TO "images"`);
        await queryRunner.query(`CREATE TABLE "temporary_tags" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "movieId" integer, CONSTRAINT "FK_8e4b797ccaf1102c17b5afedce8" FOREIGN KEY ("movieId") REFERENCES "movies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tags"("id", "name", "movieId") SELECT "id", "name", "movieId" FROM "tags"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`ALTER TABLE "temporary_tags" RENAME TO "tags"`);
        await queryRunner.query(`CREATE TABLE "temporary_movies" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "release_date" datetime NOT NULL, "maximum_date" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cinemaId" integer, "imagesId" integer, "tagsId" integer, CONSTRAINT "FK_ec02b414813e3b5e8622a03a6e6" FOREIGN KEY ("cinemaId") REFERENCES "cinemas" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_aaad6c27de4934340e590c1ce42" FOREIGN KEY ("imagesId") REFERENCES "images" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_fe9abc1a3fedf5ca29d8819060c" FOREIGN KEY ("tagsId") REFERENCES "tags" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_movies"("id", "name", "release_date", "maximum_date", "created_at", "updated_at", "cinemaId", "imagesId", "tagsId") SELECT "id", "name", "release_date", "maximum_date", "created_at", "updated_at", "cinemaId", "imagesId", "tagsId" FROM "movies"`);
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
        await queryRunner.query(`CREATE TABLE "movies" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "release_date" datetime NOT NULL, "maximum_date" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cinemaId" integer, "imagesId" integer, "tagsId" integer)`);
        await queryRunner.query(`INSERT INTO "movies"("id", "name", "release_date", "maximum_date", "created_at", "updated_at", "cinemaId", "imagesId", "tagsId") SELECT "id", "name", "release_date", "maximum_date", "created_at", "updated_at", "cinemaId", "imagesId", "tagsId" FROM "temporary_movies"`);
        await queryRunner.query(`DROP TABLE "temporary_movies"`);
        await queryRunner.query(`ALTER TABLE "tags" RENAME TO "temporary_tags"`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "movieId" integer)`);
        await queryRunner.query(`INSERT INTO "tags"("id", "name", "movieId") SELECT "id", "name", "movieId" FROM "temporary_tags"`);
        await queryRunner.query(`DROP TABLE "temporary_tags"`);
        await queryRunner.query(`ALTER TABLE "images" RENAME TO "temporary_images"`);
        await queryRunner.query(`CREATE TABLE "images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "movieId" integer)`);
        await queryRunner.query(`INSERT INTO "images"("id", "path", "movieId") SELECT "id", "path", "movieId" FROM "temporary_images"`);
        await queryRunner.query(`DROP TABLE "temporary_images"`);
        await queryRunner.query(`DROP TABLE "movies"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cinemaId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "FK_32dc5368285e0b69f2f72326b60" FOREIGN KEY ("cinemaId") REFERENCES "cinemas" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "email", "password", "role", "created_at", "updated_at", "cinemaId") SELECT "id", "name", "email", "password", "role", "created_at", "updated_at", "cinemaId" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
