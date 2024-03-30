import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyProductTag1711784274588 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_translation" DROP COLUMN "customFieldsTags"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_translation" ADD "customFieldsTags" character varying(255)`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_translation" DROP COLUMN "customFieldsTags"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_translation" ADD "customFieldsTags" text`, undefined);
   }

}
