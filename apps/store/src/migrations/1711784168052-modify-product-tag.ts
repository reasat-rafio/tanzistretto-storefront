import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyProductTag1711784168052 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "customFieldsShownewtag"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_translation" ADD "customFieldsTags" text`, undefined);
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "customFieldsMarkdefault" SET DEFAULT false`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_variant" ALTER COLUMN "customFieldsMarkdefault" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "product_translation" DROP COLUMN "customFieldsTags"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD "customFieldsShownewtag" boolean`, undefined);
   }

}
