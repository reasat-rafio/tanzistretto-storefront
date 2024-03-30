import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyProductTagField1711784321988 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_translation" DROP COLUMN "customFieldsTags"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD "customFieldsDisplaynewtag" boolean DEFAULT false`, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "customFieldsDisplaynewtag"`, undefined);
        await queryRunner.query(`ALTER TABLE "product_translation" ADD "customFieldsTags" character varying(255)`, undefined);
   }

}
