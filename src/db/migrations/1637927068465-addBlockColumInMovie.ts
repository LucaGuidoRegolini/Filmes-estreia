import {MigrationInterface, QueryRunner} from "typeorm";

export class addBlockColumInMovie1637927068465 implements MigrationInterface {
    name = 'addBlockColumInMovie1637927068465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_movies" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "release_date" datetime NOT NULL, "maximum_date" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cinemaId" integer, "imagesId" integer, "tagsId" integer, "blocked" boolean NOT NULL DEFAULT (1), CONSTRAINT "FK_fe9abc1a3fedf5ca29d8819060c" FOREIGN KEY ("tagsId") REFERENCES "tags" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_aaad6c27de4934340e590c1ce42" FOREIGN KEY ("imagesId") REFERENCES "images" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_ec02b414813e3b5e8622a03a6e6" FOREIGN KEY ("cinemaId") REFERENCES "cinemas" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_movies"("id", "name", "release_date", "maximum_date", "created_at", "updated_at", "cinemaId", "imagesId", "tagsId") SELECT "id", "name", "release_date", "maximum_date", "created_at", "updated_at", "cinemaId", "imagesId", "tagsId" FROM "movies"`);
        await queryRunner.query(`DROP TABLE "movies"`);
        await queryRunner.query(`ALTER TABLE "temporary_movies" RENAME TO "movies"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" RENAME TO "temporary_movies"`);
        await queryRunner.query(`CREATE TABLE "movies" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "release_date" datetime NOT NULL, "maximum_date" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "cinemaId" integer, "imagesId" integer, "tagsId" integer, CONSTRAINT "FK_fe9abc1a3fedf5ca29d8819060c" FOREIGN KEY ("tagsId") REFERENCES "tags" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_aaad6c27de4934340e590c1ce42" FOREIGN KEY ("imagesId") REFERENCES "images" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_ec02b414813e3b5e8622a03a6e6" FOREIGN KEY ("cinemaId") REFERENCES "cinemas" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "movies"("id", "name", "release_date", "maximum_date", "created_at", "updated_at", "cinemaId", "imagesId", "tagsId") SELECT "id", "name", "release_date", "maximum_date", "created_at", "updated_at", "cinemaId", "imagesId", "tagsId" FROM "temporary_movies"`);
        await queryRunner.query(`DROP TABLE "temporary_movies"`);
    }

}
